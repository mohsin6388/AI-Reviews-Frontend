import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ReviewPage from './pages/ReviewPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import './index.css';
import ForgotPassword from './pages/ForgotPassword';
import CreatePassword from './pages/CreatePassword';
import HomeLanding from './pages/Home.jsx';

// Protected route — redirect to /login if not authenticated
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null; // wait for localStorage to load
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public route — redirect to /dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages */}

      <Route
        path='/'
        element={
          <HomeLanding/>
        }
        />


      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      {/* Authenticated dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/create-password" element={<CreatePassword />} />

      {/* Customer review flow — linked from QR code (public) */}
      <Route path="/review/:businessId" element={<ReviewPage />} />

      {/* Legacy public register page (kept for backward compat) */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Root: go to dashboard if logged in, else login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
