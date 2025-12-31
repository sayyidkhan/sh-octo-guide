import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import type { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
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
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
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

