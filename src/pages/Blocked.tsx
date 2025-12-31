import { useAuth } from '@/contexts/AuthContext';

export function Blocked() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-base px-4">
      <div className="max-w-md w-full bg-white rounded-wellness shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-soft-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-soft-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-dark-text mb-2">
            Access Restricted
          </h1>
          <p className="text-dark-text/70">
            Your account has been temporarily blocked. Please contact support for assistance.
          </p>
        </div>

        <button
          onClick={signOut}
          className="w-full bg-dark-text hover:bg-dark-text/90 text-white font-medium py-2 px-4 rounded-wellness transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

