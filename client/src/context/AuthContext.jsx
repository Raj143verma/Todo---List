import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await authService.getMe();
      if (response.success) {
        setUser(response); // Response direct schema: name, email, streak, avatar
      } else {
        logout();
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Listen for Axios interceptor auto-logout triggers on 401s
    const handleLogoutEvent = () => {
      setUser(null);
    };

    window.addEventListener('auth-logout', handleLogoutEvent);
    return () => {
      window.removeEventListener('auth-logout', handleLogoutEvent);
    };
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success && response.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      setUser(response);
    }
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response.success && response.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      setUser(response);
    }
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.warn('Backend server logout connection bypassed/offline:', e);
    }
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
