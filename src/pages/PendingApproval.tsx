import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function PendingApproval() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // If user becomes approved, redirect to home
  useEffect(() => {
    if (user?.approved) {
      navigate('/home');
    }
  }, [user, navigate]);

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
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-wellness transition-colors cursor-pointer"
          >
            Check Approval Status
          </button>

          <button
            onClick={signOut}
            className="w-full bg-white hover:bg-neutral-base text-dark-text font-medium py-3 px-6 rounded-wellness border border-neutral-base/50 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

