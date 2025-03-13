import storageService from './storageService';
import toast from 'react-hot-toast';

const ROLE_MAPPING = {
  'Quản trị viên': 'admin',
  'Nhân viên': 'staff',
  'Thương hiệu': 'brand',
  'Trường học': 'campus'
};

class AuthService {
  // Hàm xử lý dữ liệu từ API
  async processLoginResponse(apiData, credentials) {
    try {
      const { token, role, accountId, brandId } = apiData || {};

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
      storageService.setRoleLogin(mappedRole);
      storageService.setNameLogin(credentials.userName);
      storageService.setLoginId(accountId || '');
      if (brandId) storageService.setBrandId(brandId);

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
    } catch (error) {
      console.error('Lỗi xử lý dữ liệu đăng nhập:', error);
      return { success: false, message: 'Lỗi xử lý dữ liệu đăng nhập!' };
    }
  }

  logout() {
    storageService.clearAll();
    toast.success('Đã đăng xuất thành công!');
  }
}

export default AuthService;