import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function formatFirebaseError(err: any) {
  const code = err?.code as string | undefined;
  if (code === 'auth/popup-closed-by-user') return 'Sign-in popup was closed. Please try again.';
  if (code === 'auth/cancelled-popup-request') return 'Sign-in popup was cancelled. Please try again.';
  if (code === 'auth/popup-blocked') return 'Popup blocked by the browser. Please allow popups and try again.';
  return err?.message || 'Something went wrong. Please try again.';
}

export function Profile() {
  const { user, loading, deleteAccount, signOut } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);

    const confirmed = confirm(
      'Delete your account?\n\nThis will permanently remove your profile and you will lose access immediately. This cannot be undone.'
    );
    if (!confirmed) return;

    const confirmed2 = confirm('Final confirmation: do you want to permanently delete your account?');
    if (!confirmed2) return;

    try {
      setIsDeleting(true);
      await deleteAccount();
      // After delete, the auth state will clear; we also navigate to landing.
      navigate('/');
    } catch (err: any) {
      setError(formatFirebaseError(err));
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-wellness shadow-sm border border-neutral-base/50 p-8 text-center">
          <h1 className="text-2xl font-heading font-bold text-dark-text mb-2">Profile</h1>
          <p className="text-dark-text/70 mb-6">You are not signed in.</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-wellness transition-colors cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-base">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-wellness shadow-sm border border-neutral-base/50 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-dark-text">
                Profile
              </h1>
              <p className="text-dark-text/70 mt-1">
                Manage your account settings.
              </p>
            </div>

            <button
              onClick={async () => {
                await signOut();
                navigate('/login');
              }}
              className="text-sm font-medium text-dark-text hover:text-primary transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          <div className="mt-8 grid gap-6">
            <div className="rounded-wellness border border-neutral-base/50 p-4">
              <p className="text-xs text-dark-text/60 mb-1">Name</p>
              <p className="text-dark-text font-medium">{user.displayName || '—'}</p>
              <p className="text-xs text-dark-text/60 mt-4 mb-1">Email</p>
              <p className="text-dark-text font-medium">{user.email || '—'}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Role: {user.role || 'member'}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.approved ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-800'
                }`}>
                  {user.approved ? 'Approved' : 'Pending Approval'}
                </span>
              </div>
            </div>

            <div className="rounded-wellness border border-red-200 bg-red-50/40 p-4">
              <h2 className="text-lg font-heading font-semibold text-dark-text">Danger Zone</h2>
              <p className="text-sm text-dark-text/70 mt-1">
                Deleting your account is permanent and cannot be undone.
              </p>

              {error && (
                <div className="mt-4 p-3 rounded-wellness border border-red-200 bg-red-50 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-medium py-3 px-6 rounded-wellness transition-colors cursor-pointer"
                >
                  {isDeleting ? 'Deleting…' : 'Delete My Account'}
                </button>
                <p className="text-xs text-dark-text/60 mt-2">
                  You may be asked to re-authenticate with Google before deletion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


