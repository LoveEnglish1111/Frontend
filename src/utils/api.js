import axios from 'axios';

// Determine API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/SignIn';
    }
    return Promise.reject(error);
  },
);

// Mock API functions (BEFORE real backend is ready)
export const mockAuthApi = {
  // Mock register
  register: async (name, email, password) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    
    // Mock validation
    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }
    if (email === 'existing@example.com') {
      throw new Error('Email already exists');
    }
    
    return {
      success: true,
      message: 'Registration successful. Please check your email to verify.',
    };
  },

  // Mock login
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    
    // Mock validation
    if (email === 'admin@irish.com' && password === 'Admin123!') {
      const token = `mock_token_${Date.now()}`;
      const user = {
        id: 'admin001',
        name: 'Admin User',
        email: 'admin@irish.com',
        avatar: '👨‍💼',
        role: 'admin',
      };
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user, token };
    }
    
    if (email === 'user@irish.com' && password === 'User123!') {
      const token = `mock_token_${Date.now()}`;
      const user = {
        id: 'user001',
        name: 'John Doe',
        email: 'user@irish.com',
        avatar: '👨‍🎓',
        role: 'user',
      };
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user, token };
    }
    
    throw new Error('Email or password is incorrect');
  },

  // Mock logout
  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return { success: true };
  },

  // Mock forgot password
  forgotPassword: async (email) => {
    await new Promise(r => setTimeout(r, 600));
    if (!email) throw new Error('Email is required');
    // Mock: always succeeds
    return { success: true, message: 'Password reset link sent to your email' };
  },

  // Mock reset password
  resetPassword: async (token, newPassword) => {
    await new Promise(r => setTimeout(r, 600));
    if (!token || !newPassword) throw new Error('Missing required fields');
    // Mock: always succeeds
    localStorage.removeItem('authToken');
    return { success: true, message: 'Password reset successful' };
  },

  // Mock verify email
  verifyEmail: async (token) => {
    await new Promise(r => setTimeout(r, 600));
    if (!token) throw new Error('Invalid token');
    return { success: true, message: 'Email verified successfully' };
  },

  // Mock get current user
  getMe: async () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      throw new Error('Not authenticated');
    }
    
    await new Promise(r => setTimeout(r, 300));
    return JSON.parse(user);
  },
};

// Export apiClient and mock API
export default apiClient;
