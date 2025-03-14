import axios from 'axios';
import toast from 'react-hot-toast';
import StorageService from '../../services/storageService'; // Import storageService từ file riêng

const AUTH_ENDPOINTS = {
  LOGIN: 'https://swallet-api.onrender.com/api/Auth/login'
};

const ROLE_MAPPING = {
  'Quản trị viên': 'admin',
  'Nhân viên': 'staff',
  'Thương hiệu': 'brand',
  'Trường học': 'campus'
};

const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Đăng nhập thất bại!',
  LOGIN_ERROR: 'Lỗi tài khoản hoặc mật khẩu, xin vui lòng nhập lại',
  INVALID_DATA: 'Dữ liệu từ server không hợp lệ!',
  NO_TOKEN: 'Không nhận được token từ server!',
  PROCESS_ERROR: 'Lỗi xử lý dữ liệu đăng nhập!',
  LOGOUT_ERROR: 'Đã xảy ra lỗi khi đăng xuất!'
};

export const login = async (userName, password) => {
  try {
    const response = await axios.post(AUTH_ENDPOINTS.LOGIN, {
      userName,
      password
    });

    console.log('📥 Phản hồi từ server:', response);

    if (response.status !== 200 || !response.data) {
      console.warn('⚠️ API trả về lỗi:', response);
      return {
        success: false,
        message: response.data?.message || ERROR_MESSAGES.LOGIN_ERROR
      };
    }

    const apiData = response.data;
    
    // Xử lý response ngay trong login
    if (!apiData) {
      return { success: false, message: ERROR_MESSAGES.INVALID_DATA };
    }

    const { token, role, accountId, brandId } = apiData;

    if (!token) {
      return { success: false, message: ERROR_MESSAGES.NO_TOKEN };
    }

    StorageService.setAccessToken(token);

    const mappedRole = ROLE_MAPPING[role] || role;
    const userData = { 
      role: mappedRole, 
      accountId,
      userName
    };
    if (brandId) userData.brandId = brandId;

    StorageService.setUser(userData);
    StorageService.setRoleLogin(mappedRole);
    StorageService.setNameLogin(userName);
    StorageService.setLoginId(accountId || '');
    if (brandId) StorageService.setBrandId(brandId);

    console.log('✅ Thông tin người dùng đã lưu:', userData);

    return {
      success: true,
      data: { 
        token, 
        userName, 
        loginId: accountId, 
        role: mappedRole,
        brandId
      }
    };
  } catch (error) {
    console.error('❌ Lỗi khi gọi API:', error);
    return {
      success: false,
      message: 'Username hoặc password không đúng, xin vui lòng nhập lại!'
    };
  }
};

export const logout = () => {
  try {
    StorageService.clearAll();
    toast.success('Đã đăng xuất thành công!');
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error);
    toast.error(ERROR_MESSAGES.LOGOUT_ERROR);
  }
};