import apiClient from './apiClient';
import { AUTH_ENDPOINTS } from './endpoints';

export const loginAPI = async (credentials) => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return {
      status: 200,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.status || 500,
      data: { message: 'Lỗi tài khoản hoặc mật khẩu, xin vui lòng nhập lại' }
    };
  }
};

