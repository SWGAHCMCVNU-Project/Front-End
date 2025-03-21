import apiClient from './apiClient';
import toast from 'react-hot-toast';
import StorageService from '../../services/storageService'; // Ensure this import is correct
import { AUTH_ENDPOINTS } from './endpoints';

const ROLE_MAPPING = {
  'Quản trị viên': 'admin',
  'Nhân viên': 'staff',
  'Thương hiệu': 'brand',
  'Trường học': 'campus',
};

const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Đăng nhập thất bại!',
  LOGIN_ERROR: 'Lỗi tài khoản hoặc mật khẩu, xin vui lòng nhập lại',
  INVALID_DATA: 'Dữ liệu từ server không hợp lệ!',
  NO_TOKEN: 'Không nhận được token từ server!',
  PROCESS_ERROR: 'Lỗi xử lý dữ liệu đăng nhập!',
  LOGOUT_ERROR: 'Đã xảy ra lỗi khi đăng xuất!',
  VERIFY_ACCOUNT_ERROR: 'Xác minh tài khoản thất bại!',
  INVALID_VERIFY_DATA: 'Dữ liệu xác minh không hợp lệ!',
};

export const login = async (userName, password) => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, {
      userName,
      password,
    });

    if (response.status !== 200 || !response.data) {
      console.warn('⚠️ API trả về lỗi:', response);
      return {
        success: false,
        message: response.data?.message || ERROR_MESSAGES.LOGIN_ERROR,
      };
    }

    const apiData = response.data;

    if (!apiData) {
      return { success: false, message: ERROR_MESSAGES.INVALID_DATA };
    }

    const { token, role, accountId, brandId, isVerify } = apiData;

    if (!token) {
      return { success: false, message: ERROR_MESSAGES.NO_TOKEN };
    }

    // Store data using StorageService methods
    StorageService.setAccessToken(token);

    const mappedRole = ROLE_MAPPING[role] || role;
    const userData = {
      role: mappedRole,
      accountId,
      userName,
      isVerify, // Include isVerify in userData
    };
    if (brandId) userData.brandId = brandId;

    StorageService.setUser(userData);
    StorageService.setRoleLogin(mappedRole);
    StorageService.setNameLogin(userName);
    StorageService.setLoginId(accountId || '');
    if (brandId) StorageService.setBrandId(brandId);

    // Use a custom method or localStorage directly if setItem isn’t defined
    StorageService.setItem
      ? StorageService.setItem('isVerify', isVerify)
      : localStorage.setItem('isVerify', JSON.stringify(isVerify)); // Fallback

    console.log('✅ Thông tin người dùng đã lưu:', userData);

    return {
      success: true,
      data: {
        token,
        userName,
        loginId: accountId,
        role: mappedRole,
        brandId,
        isVerify,
      },
    };
  } catch (error) {
    console.error('❌ Lỗi khi gọi API:', error);
    return {
      success: false,
      message: 'Username hoặc password không đúng, xin vui lòng nhập lại!',
    };
  }
};

export const verifyAccount = async (id, email, code) => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_ACCOUNT, {
      id,
      email,
      code,
    });

    if (response.status !== 200 || !response.data) {
      console.warn('⚠️ API verify account trả về lỗi:', response);
      return {
        success: false,
        message: response.data?.message || ERROR_MESSAGES.VERIFY_ACCOUNT_ERROR,
      };
    }

    const apiData = response.data;

    if (!apiData) {
      return {
        success: false,
        message: ERROR_MESSAGES.INVALID_VERIFY_DATA,
      };
    }

    toast.success('Xác minh tài khoản thành công!');
    return {
      success: true,
      data: apiData,
    };
  } catch (error) {
    console.error('❌ Lỗi khi xác minh tài khoản:', error);
    toast.error(ERROR_MESSAGES.VERIFY_ACCOUNT_ERROR);
    return {
      success: false,
      message: error.response?.data?.message || ERROR_MESSAGES.VERIFY_ACCOUNT_ERROR,
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