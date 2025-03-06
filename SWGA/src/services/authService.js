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
  async login(credentials, navigate) {
    try {
      const result = await loginAPI(credentials);

      if (result.status === 200) {
        const { token, role, accountId } = result.data;

        if (!token) {
          toast.error('Không nhận được token từ server');
          throw new Error('Token validation failed');
        }

        // Lưu token
        storageService.setAccessToken(token);

        // Map role từ tiếng Việt sang tiếng Anh
        const mappedRole = ROLE_MAPPING[role] || role;

        // Tạo user object từ data nhận được
        const userData = {
          role: mappedRole,
          accountId: accountId // Có thể ẩn một phần accountId nếu cần
        };

        // Lưu user data
        storageService.setUser(userData);

        toast.success('Đăng nhập thành công!');
        navigate('/dashboard', { replace: true });
        return { success: true };
      } else {
        toast.error('Đăng nhập thất bại!');
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error occurred');
      toast.error('Đăng nhập thất bại!');
      throw new Error('Authentication failed');
    }
  }

  logout() {
    storageService.removeAccessToken();
    storageService.removeUser();
  }
}

export default new AuthService();