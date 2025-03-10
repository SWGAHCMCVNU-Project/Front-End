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
        const { token, role, accountId, brandId } = result.data;

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
          accountId: accountId,
          brandId: brandId || accountId // Nếu không có brandId, dùng accountId
        };

        // Lưu user data
        storageService.setUser(userData);
        
        // Lưu brandId nếu có
        if (brandId) {
          console.log("Saving brandId from login:", brandId);
          storageService.setBrandId(brandId);
        } else if (accountId && mappedRole === 'brand') {
          console.log("Using accountId as brandId:", accountId);
          storageService.setBrandId(accountId);
        }

        toast.success('Đăng nhập thành công!');
        navigate('/dashboard', { replace: true });
        return { success: true };
      } else {
        toast.error('Đăng nhập thất bại!');
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error occurred:', error);
      toast.error('Đăng nhập thất bại!');
      throw new Error('Authentication failed');
    }
  }

  logout() {
    storageService.removeAccessToken();
    storageService.removeUser();
    localStorage.removeItem("brandId");
  }
}

export default new AuthService();