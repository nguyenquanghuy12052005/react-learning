// src/services/auth.service.js
import axiosInstance from '../utils/axios.config';

class AuthService {
  // Đăng ký
  async register(data) {
    const response = await axiosInstance.post('/users/', data);
    return response.data;
  }

  // Đăng nhập - chỉ trả về token
  async login(data) {
    const response = await axiosInstance.post('/auth/', data);
    return response.data; // { token: "..." }
  }

  // Lấy thông tin user hiện tại bằng token
  async getCurrentUserFromAPI() {
    const response = await axiosInstance.get('/auth/');
    return response.data; // Trả về thông tin user từ API
  }

  // Đăng xuất
  logout() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('user');
  }

  // Lấy thông tin user từ localStorage
  getCurrentUserFromStorage() {
    const userStr = localStorage.getItem('user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }

  // Lấy token từ localStorage
  getToken() {
    return localStorage.getItem('x-auth-token');
  }

  // Lưu token vào localStorage
  saveToken(token) {
    localStorage.setItem('x-auth-token', token);
  }

  // Lưu user vào localStorage
  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();