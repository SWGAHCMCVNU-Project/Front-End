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

        // Lưu token
        storageService.setAccessToken(token);

        // Ánh xạ role và lưu thông tin user
        const mappedRole = ROLE_MAPPING[role] || role;
        const userData = { 
          role: mappedRole, 
          accountId,
          userName: credentials.userName // Lưu userName từ credentials
        };
        if (brandId) userData.brandId = brandId;

        storageService.setUser(userData);
        storageService.setRoleLogin(mappedRole); // Lưu role vào roleLogin
        storageService.setNameLogin(credentials.userName); // Lưu userName vào nameLogin
        storageService.setLoginId(accountId || ''); // Lưu accountId làm loginId
        if (brandId) storageService.setBrandId(brandId);

        // Trả về thông tin đầy đủ để SignIn sử dụng nếu cần
        return { 
          success: true, 
          data: { 
            token, 
            userName: credentials.userName, 
            loginId: accountId, 
            role: mappedRole,
            brandId
          }
        };
      } 

      return { success: false, message: result?.data?.message || 'Sai tài khoản hoặc mật khẩu!' };
      
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      return { success: false, message: error.response?.data?.message || 'Không thể kết nối đến máy chủ!' };
    }
  }

  logout() {
    storageService.clearAll(); // Sử dụng clearAll để xóa toàn bộ dữ liệu
    toast.success('Đã đăng xuất thành công!');
  }
}

export default new AuthService();