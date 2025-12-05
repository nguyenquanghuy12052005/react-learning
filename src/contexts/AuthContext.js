// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const storedToken = authService.getToken();
      const storedUser = authService.getCurrentUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      authService.saveAuthData(response.token, response.user);
      
      setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      
      return { success: true, data: response };
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng ký thất bại';
      return { success: false, error: message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      authService.saveAuthData(response.token, response.user);
      
      setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      
      return { success: true, data: response };
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng nhập thất bại';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};