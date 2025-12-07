// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user từ localStorage khi app khởi động
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = authService.getToken();
      const storedUser = authService.getCurrentUserFromStorage();

      if (storedToken) {
        setToken(storedToken);
        
        // Nếu có user trong localStorage, dùng tạm
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }

        // Gọi API để lấy thông tin user mới nhất
        try {
          const userData = await authService.getCurrentUserFromAPI();
          setUser(userData);
          authService.saveUser(userData); // Lưu vào localStorage
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Lỗi khi lấy thông tin user:', error);
          // Nếu token không hợp lệ, xóa hết
          if (error.response?.status === 401) {
            authService.logout();
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);

  // Đăng ký
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      // Nếu API đăng ký trả về cả user và token
      if (response.user && response.token) {
        authService.saveToken(response.token);
        authService.saveUser(response.user);
        
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        
        return { success: true, data: response };
      }
      
      // Nếu chỉ trả về token, gọi API để lấy thông tin user
      if (response.token) {
        authService.saveToken(response.token);
        setToken(response.token);
        
        const userData = await authService.getCurrentUserFromAPI();
        authService.saveUser(userData);
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true, data: { token: response.token, user: userData } };
      }
      
      return { success: false, error: 'Đăng ký thất bại' };
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng ký thất bại';
      return { success: false, error: message };
    }
  };

  // Đăng nhập
  const login = async (credentials) => {
    try {
      // Gọi API đăng nhập - chỉ trả về token
      const response = await authService.login(credentials);
      
      if (!response.token) {
        return { success: false, error: 'Không nhận được token' };
      }

      // Lưu token
      authService.saveToken(response.token);
      setToken(response.token);

      // Gọi API để lấy thông tin user
      try {
        const userData = await authService.getCurrentUserFromAPI();
        
        // Lưu thông tin user
        authService.saveUser(userData);
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true, data: { token: response.token, user: userData } };
      } catch (userError) {
        console.error('Lỗi khi lấy thông tin user:', userError);
        
        // Nếu không lấy được thông tin user, vẫn cho đăng nhập
        // nhưng sẽ thử lại sau
        setIsAuthenticated(true);
        return { success: true, data: { token: response.token, user: null } };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng nhập thất bại';
      return { success: false, error: message };
    }
  };




   //update user 
   const updateProfile = async (data) => {
     try {

      if(!user?._id) {
         return { success: false, error: 'Không tìm thấy thông tin user' };
      }

      const currentToken = authService.getToken();
      if (!currentToken) {
        return { success: false, error: 'Vui lòng đăng nhập lại' };
      }

      console.log('Updating profile for user:', user._id);
      console.log('Update data:', data);

      //update
    const response = await authService.updateUser(data, user._id);

    //cập nhập user mới
    authService.saveUser(response);
    setUser(response);

    return { success: true, user: response };
   } catch (error) {
      const message = error.response?.data?.message || 'Cập nhật thất bại';
      return { success: false, error: message };
    }
  };


  // Đăng xuất
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Refresh thông tin user (gọi khi cần cập nhật thông tin)
  const refreshUser = async () => {
    try {
      const userData = await authService.getCurrentUserFromAPI();
      authService.saveUser(userData);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Lỗi khi refresh user:', error);
      return { success: false, error: 'Không thể cập nhật thông tin' };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    refreshUser, 
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};