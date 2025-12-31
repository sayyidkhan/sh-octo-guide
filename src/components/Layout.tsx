import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Home' },
    { to: '/social', label: 'Social Channels' },
    { to: '/products', label: 'Products' },
    { to: '/testimonials', label: 'Testimonials' },
    // Only show Admin link if user is admin OR if their email is in the admin whitelist
    ...(user?.role === 'admin' || (user?.email && import.meta.env.VITE_ADMIN_EMAILS?.split(',').includes(user.email))
      ? [{ to: '/admin', label: 'Admin' }] 
      : []
    ),
  ];

  return (
    <div className="min-h-screen bg-neutral-base flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center">
              <h1 className="text-xl md:text-2xl font-heading font-bold text-primary">
                13 Gold Diamonds
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-dark-text hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* User Menu / Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="text-sm text-dark-text hover:text-primary transition-colors cursor-pointer"
                  >
                    {user.displayName || user.email}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-dark-text hover:text-primary transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-wellness text-dark-text hover:bg-neutral-base cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-base/50">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-wellness text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-dark-text hover:bg-neutral-base'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {user && (
                <div className="pt-4 border-t border-neutral-base/50">
                  <div className="px-3 py-2 text-sm text-dark-text/70">
                    {user.displayName || user.email}
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-wellness text-sm font-medium transition-colors ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-dark-text hover:bg-neutral-base'
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left py-2 px-3 rounded-wellness text-sm font-medium text-dark-text hover:bg-neutral-base cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-base/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-dark-text/70">
            © {currentYear} 13 Gold Diamonds. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

