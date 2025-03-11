import { loginAPI } from '../store/api/authApi';
import storageService from './storageService';
import toast from 'react-hot-toast';

const ROLE_MAPPING = {
  'Quản trị viên': 'admin',
  'Nhân viên': 'staff',
  'Thương hiệu': 'brand',
  'Trường học': 'campus'
};

class AuthService {
  async login(credentials) {
    try {
      const result = await loginAPI(credentials);

      if (result?.status === 200) {
        const { token, role, accountId, brandId } = result.data || {};

        if (!token) {
          return { success: false, message: 'Không nhận được token từ server!' };
        }

        storageService.setAccessToken(token);

        const mappedRole = ROLE_MAPPING[role] || role;
        const userData = { role: mappedRole, accountId };
        if (brandId) userData.brandId = brandId;

        storageService.setUser(userData);
        if (brandId) storageService.setBrandId(brandId);

        return { success: true };
      } 

      return { success: false, message: result?.data?.message || 'Sai tài khoản hoặc mật khẩu!' };
      
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      return { success: false, message: error.response?.data?.message || 'Không thể kết nối đến máy chủ!' };
    }
  }

  logout() {
    storageService.removeAccessToken();
    storageService.removeUser();
    storageService.removeBrandId();
    toast.success('Đã đăng xuất thành công!');
  }
}

export default new AuthService();
