import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  signInWithPopup,
  reauthenticateWithPopup,
  signOut as firebaseSignOut,
  onIdTokenChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import type { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const hasForcedRefreshRef = useRef<string | null>(null);
  const lastTokenRefreshAtRef = useRef<number>(0);

  useEffect(() => {
    // onIdTokenChanged fires on sign-in/out AND whenever the ID token refreshes (claims update)
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Force-refresh the token ONCE per session per user, so claim changes (e.g. promoted to admin)
        // are picked up immediately after a normal page refresh (otherwise can take up to ~1 hour).
        if (hasForcedRefreshRef.current !== firebaseUser.uid) {
          hasForcedRefreshRef.current = firebaseUser.uid;
          try {
            await firebaseUser.getIdToken(true);
            // The forced refresh will trigger onIdTokenChanged again; exit early so we read fresh claims next run.
            return;
          } catch (e) {
            // If refresh fails (offline, etc), proceed with current token claims.
          }
        }

        // Get custom claims (role, blocked status, approved status)
        const idTokenResult = await firebaseUser.getIdTokenResult();
        
        // Check if user is a super admin (listed in VITE_ADMIN_EMAILS)
        const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((e: string) => e.trim()) || [];
        const isSuperAdmin = firebaseUser.email ? adminEmails.includes(firebaseUser.email) : false;
        
        // Super admins are always approved and admins
        const approved = isSuperAdmin ? true : (idTokenResult.claims.approved as boolean || false);
        const role = isSuperAdmin ? 'admin' : ((idTokenResult.claims.role as 'member' | 'admin') || 'member');
        
        // Auto-approve super admin on first login
        if (isSuperAdmin && !idTokenResult.claims.approved) {
          try {
            const idToken = await firebaseUser.getIdToken();
            await fetch('/api/admin/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
              },
              body: JSON.stringify({
                action: 'approve',
                uid: firebaseUser.uid
              })
            });
            
            // Also set admin role if not already set
            if (!idTokenResult.claims.role || idTokenResult.claims.role !== 'admin') {
              await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                  action: 'setAdmin',
                  uid: firebaseUser.uid
                })
              });
            }
            
            // Force token refresh to get new claims
            await firebaseUser.getIdToken(true);
          } catch (error) {
            console.error('Error auto-approving super admin:', error);
          }
        }
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: role,
          blocked: idTokenResult.claims.blocked as boolean || false,
          approved: approved,
          isSuperAdmin: isSuperAdmin,
        });
      } else {
        hasForcedRefreshRef.current = null;
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Keep custom-claim changes (role/approved/blocked) fresh without requiring sign-out.
  // This helps promote/demote take effect quickly for the affected user.
  useEffect(() => {
    if (!user?.uid) return;

    const refreshToken = async () => {
      const now = Date.now();
      // Throttle to avoid excessive refresh calls
      if (now - lastTokenRefreshAtRef.current < 15_000) return;

      try {
        lastTokenRefreshAtRef.current = now;
        await auth.currentUser?.getIdToken(true);
      } catch {
        // Ignore refresh errors (offline, etc). We'll try again later.
      }
    };

    // Refresh once right after we have a user in context.
    refreshToken();

    // Refresh when tab becomes visible again (common after admin updates).
    const onVis = () => {
      if (document.visibilityState === 'visible') refreshToken();
    };
    document.addEventListener('visibilitychange', onVis);

    // Periodic refresh so role changes appear even if user stays on the page.
    // (Role changes can take a few minutes to propagate to the user's device.)
    const interval = window.setInterval(refreshToken, 5 * 60_000);

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.clearInterval(interval);
    };
  }, [user?.uid]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) {
      throw new Error('Not authenticated');
    }

    try {
      await firebaseUser.delete();
    } catch (error: any) {
      // Firebase requires recent login for sensitive actions like deleting an account
      if (error?.code === 'auth/requires-recent-login') {
        await reauthenticateWithPopup(firebaseUser, googleProvider);
        await firebaseUser.delete();
      } else {
        console.error('Error deleting account:', error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

