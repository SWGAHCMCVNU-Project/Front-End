import apiClient from './apiClient';
import { AUTH_ENDPOINTS } from './endpoints';
import AuthService from '../../services/authService'; // Import AuthService

const authService = new AuthService(); // Tạo instance của AuthService

export const loginAPI = async (credentials) => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
    
    // Gọi AuthService để xử lý dữ liệu từ server
    const result = await authService.processLoginResponse(response.data, credentials);
    
    return {
      status: 200,
      success: result.success,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      status: error.status || 500,
      success: false,
      message: error.response?.data?.message || 'Lỗi tài khoản hoặc mật khẩu, xin vui lòng nhập lại',
    };
  }
};