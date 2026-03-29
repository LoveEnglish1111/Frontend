import { createContext, useContext, useState, useEffect } from 'react';
import { mockAuthApi } from '../utils/api';

// Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to check token on mount
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check token & restore user on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
          // Verify token is still valid (mock check)
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session restore error:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Sign up
  const signup = async (name, email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await mockAuthApi.register(name, email, password);
      return result;
    } catch (error) {
      const message = error.message || 'Registration failed. Please try again.';
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in
  const signin = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await mockAuthApi.login(email, password);
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (error) {
      const message = error.message || 'Sign in failed. Please check your credentials.';
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signout = async () => {
    setIsLoading(true);
    try {
      await mockAuthApi.logout();
      setUser(null);
      setIsAuthenticated(false);
      setAuthError(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await mockAuthApi.forgotPassword(email);
      return result;
    } catch (error) {
      const message = error.message || 'Failed to send reset link.';
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await mockAuthApi.resetPassword(token, newPassword);
      // Clear auth state after password reset
      setUser(null);
      setIsAuthenticated(false);
      return result;
    } catch (error) {
      const message = error.message || 'Password reset failed.';
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (token) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await mockAuthApi.verifyEmail(token);
      return result;
    } catch (error) {
      const message = error.message || 'Email verification failed.';
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error
  const clearError = () => setAuthError(null);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    authError,
    signup,
    signin,
    signout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
