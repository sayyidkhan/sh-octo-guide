import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { Landing } from '@/pages/Landing';
import { Login } from '@/pages/Login';
import { Blocked } from '@/pages/Blocked';
import { PendingApproval } from '@/pages/PendingApproval';
import { Home } from '@/pages/Home';
import { SocialChannels } from '@/pages/SocialChannels';
import { Products } from '@/pages/Products';
import { Testimonials } from '@/pages/Testimonials';
import { AdminDashboard } from '@/pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blocked" element={<Blocked />} />
          <Route path="/pending-approval" element={<PendingApproval />} />

          {/* Protected Routes - Member Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/social"
            element={
              <ProtectedRoute>
                <Layout>
                  <SocialChannels />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Layout>
                  <Products />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/testimonials"
            element={
              <ProtectedRoute>
                <Layout>
                  <Testimonials />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

