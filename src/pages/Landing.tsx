import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { StrongMenLogo } from '@/components/StrongMenLogo';

export function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-[#65cba0] to-[#b3ce66] text-white px-4 overflow-hidden">
        
        {/* Background Overlay/Texture if needed */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <StrongMenLogo />

          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 drop-shadow-md">
            13 Gold Diamonds
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-medium text-white/95 drop-shadow-sm italic">
            Your <span className="animate-text-shine">Wellness Journey</span> & <span className="animate-text-shine">Business Success</span> Starts Here
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Join our exclusive community of wellness enthusiasts building thriving businesses 
            and transforming lives through premium health products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-[#5db598] hover:bg-gray-50 font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg min-w-[200px] cursor-pointer"
            >
              Member Login
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded-full transition-all text-lg min-w-[200px] cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-dark-text mb-6">
              The 13 Gold Diamond Mindset
            </h2>
            <p className="text-xl text-dark-text/70 max-w-3xl mx-auto leading-relaxed">
              Transform your approach to wellness and business with our proven system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MindsetCard
              icon="💼"
              title="Run Like a Business"
              description="This is a business and should be treated professionally, not as a hobby"
            />
            <MindsetCard
              icon="🎯"
              title="3-Year Success Graph"
              description="Chart your journey with our proven roadmap to financial freedom"
            />
            <MindsetCard
              icon="👨‍💼"
              title="Become a CEO"
              description="Drinking the coffee equals becoming the CEO of your own success"
            />
            <MindsetCard
              icon="💰"
              title="Income Methods"
              description="3×7, 111 Coffee Method, and the 1 Simple Method for consistent growth"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 md:py-32 bg-neutral-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-dark-text mb-6">
              Premium Wellness Products
            </h2>
            <p className="text-xl text-dark-text/70">
              Natural, effective solutions for optimal health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ProductCard
              title="Natural Ingredients"
              description="Sourced from the finest natural sources for maximum effectiveness"
              icon="🌿"
            />
            <ProductCard
              title="Proven Results"
              description="Backed by testimonials from thousands of satisfied members"
              icon="⭐"
            />
            <ProductCard
              title="Expert Guidance"
              description="Complete dosage info and step-by-step instructions"
              icon="📋"
            />
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-dark-text mb-6">
              Business Training & Support
            </h2>
            <p className="text-xl text-dark-text/70 max-w-3xl mx-auto">
              Access comprehensive training to help you reach your financial goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <TrainingCard
              title="Income Training"
              items={['3×7 Method', '111 Coffee Method', '1 Simple Method', 'Group Lunch Treat']}
            />
            <TrainingCard
              title="Financial Goals"
              items={['Reach $60k/month', 'System breakdown', 'Step-by-step guides', 'Success metrics']}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-text mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-dark-text/70 mb-12">
            Join thousands of members transforming their health and building successful businesses
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-5 px-16 rounded-full transition-all shadow-lg hover:shadow-xl text-xl transform hover:-translate-y-1 cursor-pointer"
          >
            Get Started - Member Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-text text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60">
            © 2025 13 Gold Diamonds. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function MindsetCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-gray-100 group">
      <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-heading font-semibold text-dark-text mb-4">{title}</h3>
      <p className="text-dark-text/70 leading-relaxed">{description}</p>
    </div>
  );
}

function ProductCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-sm text-center border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="text-6xl mb-6 text-primary">{icon}</div>
      <h3 className="text-2xl font-heading font-semibold text-dark-text mb-4">{title}</h3>
      <p className="text-dark-text/70 leading-relaxed">{description}</p>
    </div>
  );
}

function TrainingCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-gradient-to-br from-calming-blue/5 to-primary/5 rounded-3xl p-10 border border-calming-blue/10">
      <h3 className="text-2xl font-heading font-semibold text-dark-text mb-8">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-4 text-dark-text/80 text-lg">
            <span className="text-primary mt-1 text-xl">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
