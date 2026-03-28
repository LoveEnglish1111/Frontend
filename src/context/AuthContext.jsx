import { createContext, useContext, useState } from 'react';

// Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sign up
  const signup = async (email, password, fullName) => {
    setIsLoading(true);
    try {
      // TODO: In Phase 2+, replace with actual API call
      // const response = await fetch('/api/auth/signup', { ... })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Signup:', { email, password, fullName });
      return { success: true, message: 'Signup successful. Please verify your email.' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Signup failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in
  const signin = async (email, password) => {
    setIsLoading(true);
    try {
      // TODO: In Phase 2+, replace with actual API call
      // const response = await fetch('/api/auth/signin', { ... })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user
      setUser({ email, id: 'user123', name: 'John Doe' });
      setIsAuthenticated(true);
      
      // Store token in localStorage (will be replaced with secure storage in production)
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({ email, id: 'user123', name: 'John Doe' }));
      
      console.log('Signin:', { email });
      return { success: true, message: 'Signin successful.' };
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, message: 'Signin failed. Please check your credentials.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Reset password
  const resetPassword = async (email) => {
    setIsLoading(true);
    try {
      // TODO: In Phase 2+, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Password reset link sent to your email.' };
    } catch (error) {
      return { success: false, message: 'Failed to send reset link.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (email, code) => {
    setIsLoading(true);
    try {
      // TODO: In Phase 2+, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Email verified successfully.' };
    } catch (error) {
      return { success: false, message: 'Email verification failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    signup,
    signin,
    signout,
    resetPassword,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
