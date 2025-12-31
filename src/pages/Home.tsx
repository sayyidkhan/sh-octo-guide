import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-wellness p-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark-text mb-4">
          Welcome, {user?.displayName || 'Member'}!
        </h1>
        <p className="text-lg text-dark-text/80 mb-6">
          Your journey to wellness and success starts here. Explore our resources, connect with the community, and transform your life.
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickLinkCard
          title="Social Channels"
          description="Join our WhatsApp & Telegram groups, follow us on social media"
          icon="👥"
          to="/social"
        />
        <QuickLinkCard
          title="Products"
          description="Learn about our wellness products, benefits, and how to use them"
          icon="🌿"
          to="/products"
        />
        <QuickLinkCard
          title="Testimonials"
          description="Read success stories from our community members"
          icon="⭐"
          to="/testimonials"
        />
      </div>

      {/* Mindset Section */}
      <div className="bg-white rounded-wellness p-8 shadow-sm">
        <h2 className="text-2xl font-heading font-bold text-dark-text mb-4">
          The 13 Gold Diamond Mindset
        </h2>
        <div className="space-y-3 text-dark-text/80">
          <p>✓ This is a business and should be run like one</p>
          <p>✓ This is not a hobby - it's your path to success</p>
          <p>✓ Drinking the coffee = becoming a CEO</p>
          <p className="mt-6 text-primary font-medium">
            Your 3-year journey to success starts today.
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickLinkCard({ title, description, icon, to }: { title: string; description: string; icon: string; to: string }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-wellness p-6 shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-primary/20"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-heading font-semibold text-dark-text mb-2">{title}</h3>
      <p className="text-sm text-dark-text/70">{description}</p>
    </Link>
  );
}

