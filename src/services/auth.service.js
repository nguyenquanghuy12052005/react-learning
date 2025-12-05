// src/services/auth.service.js
import axiosInstance from '../utils/axios.config';

class AuthService {
  async register(data) {
    const response = await axiosInstance.post('/users/', data);
    return response.data;
  }

  async login(data) {
    const response = await axiosInstance.post('/auth/', data);
    return response.data;
  }

  logout() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('x-auth-token');
  }

  saveAuthData(token, user) {
    localStorage.setItem('x-auth-token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();