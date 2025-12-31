import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export function PendingApproval() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // If user becomes approved, redirect to dashboard
  useEffect(() => {
    if (user?.approved) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // If user signs out (or isn't logged in), return them to landing/login
  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [loading, user, navigate]);

  // Auto-refresh ID token periodically so approval changes are picked up without a manual button.
  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (user.approved) return;

    let cancelled = false;

    const refresh = async () => {
      try {
        // Force refresh the ID token so updated custom claims (approved) are picked up
        await auth.currentUser?.getIdToken(true);
        // AuthContext listens to onIdTokenChanged and will update user.approved automatically.
      } catch (e: any) {
        if (!cancelled) {
          // Keep it silent unless it's persistent; set a small message for visibility.
          setError(e?.message || 'Unable to refresh login status. Please try again later.');
        }
      }
    };

    // Refresh immediately, then poll.
    refresh();
    const interval = window.setInterval(refresh, 8000);

    // Also refresh when the tab becomes visible again.
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [loading, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-[#65cba0] to-[#b3ce66] p-4">
      <div className="max-w-md w-full bg-white rounded-wellness shadow-wellness p-8 text-center">
        {/* Hourglass Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-heading font-bold text-dark-text mb-4">
          Pending Approval
        </h1>
        
        <p className="text-dark-text/70 mb-6">
          Thank you for signing up, <strong>{user?.displayName || user?.email}</strong>!
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-wellness p-4 mb-6">
          <p className="text-sm text-dark-text/80">
            Your account is currently pending approval from an administrator. 
            You will receive access to all member-only content once your account is approved.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-dark-text/60">
            Please check back later or contact support if you have any questions.
          </p>

          {error && (
            <div className="p-3 rounded-wellness border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-wellness transition-colors cursor-pointer"
          >
            Back to Landing
          </button>

          <button
            onClick={async () => {
              try {
                await signOut();
              } finally {
                navigate('/');
              }
            }}
            className="w-full bg-white hover:bg-neutral-base text-dark-text font-medium py-3 px-6 rounded-wellness border border-neutral-base/50 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

