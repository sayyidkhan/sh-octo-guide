import { Link } from 'react-router-dom';

export function Terms() {
  const lastUpdated = 'December 31, 2025';

  return (
    <div className="min-h-screen bg-neutral-base flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="text-lg font-heading font-bold text-primary">
            13 Gold Diamonds
          </Link>
          <Link to="/" className="text-sm text-dark-text hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-dark-text">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-dark-text/70">Last updated: {lastUpdated}</p>

          <div className="mt-8 bg-white rounded-wellness shadow-sm border border-neutral-base/50 p-6 sm:p-8 space-y-6">
            <section className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-dark-text">1. Acceptance of Terms</h2>
              <p className="text-dark-text/80 leading-relaxed">
                By accessing or using the 13 Gold Diamonds Member Portal (the “Service”), you agree to be bound by these
                Terms &amp; Conditions. If you do not agree, do not use the Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-dark-text">2. Eligibility &amp; Accounts</h2>
              <p className="text-dark-text/80 leading-relaxed">
                Access may require authentication and approval. You’re responsible for maintaining the confidentiality of
                your account and for all activity under your account.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-dark-text">3. Member Content</h2>
              <p className="text-dark-text/80 leading-relaxed">
                Content provided in the Service may be member-only and intended for personal use. Do not share, resell,
                redistribute, or publicly post member-only content unless explicitly permitted.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-dark-text">4. Acceptable Use</h2>
              <p className="text-dark-text/80 leading-relaxed">
                You agree not to misuse the Service, including attempting to gain unauthorized access, interfering with
                system operation, or using the Service for unlawful purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-dark-text">5. Disclaimer</h2>
              <p className="text-dark-text/80 leading-relaxed">
                The Service and its content are provided “as is” without warranties of any kind. Health or business
                information provided is for general informational purposes and is not professional advice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-dark-text">6. Changes</h2>
              <p className="text-dark-text/80 leading-relaxed">
                We may update these Terms from time to time. Continued use of the Service after changes become effective
                constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-dark-text">7. Contact</h2>
              <p className="text-dark-text/80 leading-relaxed">
                If you have questions about these Terms, please contact the administrators of 13 Gold Diamonds.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-base/50 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-dark-text/70">© {new Date().getFullYear()} 13 Gold Diamonds.</p>
          <Link to="/terms" className="text-sm text-dark-text hover:text-primary transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}


