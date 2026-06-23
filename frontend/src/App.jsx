import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OpportunityForm from './pages/OpportunityForm';

// Protected Route component
// If user is not logged in, redirect to login page
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until auth check is complete
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-indigo-600"
             xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span className="ml-3 text-gray-500 text-sm">Loading...</span>
      </div>
    );
  }

  // If no user redirect to login
  return user ? children : <Navigate to="/login" />;
};

// Public Route component
// If user is already logged in, redirect to dashboard
// Prevents logged in users from seeing login/register pages
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return !user ? children : <Navigate to="/dashboard" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route - redirect to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Public routes - only for non logged in users */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected routes - only for logged in users */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opportunities/create"
        element={
          <ProtectedRoute>
            <OpportunityForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opportunities/edit/:id"
        element={
          <ProtectedRoute>
            <OpportunityForm />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect unknown routes to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

const App = () => {
  return (
    // BrowserRouter enables URL based navigation
    <BrowserRouter>
      {/* AuthProvider wraps everything so all components can access auth state */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;