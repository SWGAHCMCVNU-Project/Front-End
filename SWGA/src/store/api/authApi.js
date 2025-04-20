import apiClient from './apiClient';
import toast from 'react-hot-toast';
import StorageService from '../../services/storageService';
import { AUTH_ENDPOINTS, EMAIL_ENDPOINTS, CAMPUS } from './endpoints';

const ROLE_MAPPING = {
  'Quản trị viên': 'admin',
  'Nhân viên': 'staff',
  'Thương hiệu': 'brand',
  'Campus': 'campus',
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

// Function to fetch campusId by accountId
const fetchCampusByAccountId = async (accountId) => {
  try {
    if (!accountId) {
      throw new Error('Account ID is missing or invalid');
    }

    const response = await apiClient.get(CAMPUS.GET_BY_ID_ACCOUNT.replace("{id}", accountId));

    if (response.status === 200) {
      if (response.data && response.data.id) {
        const campusId = response.data.id;
        return campusId;
      }

      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          console.warn('No campus data found for accountId:', accountId);
          return '';
        }
        const campusId = response.data[0]?.id;
        if (campusId) {
          return campusId;
        } else {
          console.error('No campusId found in array response:', response.data);
          throw new Error('Không thể lấy campusId từ API: No campusId in array response');
        }
      }

      if (response.data?.data?.id) {
        const campusId = response.data.data.id;
        return campusId;
      }

      console.error('No campusId found in response:', response);
      throw new Error('Không thể lấy campusId từ API: No campusId in response');
    } else {
      console.error('Unexpected response status:', response.status, response);
      throw new Error('Không thể lấy campusId từ API: Invalid response status');
    }
  } catch (error) {
    console.error('Error fetching campusId:', error.message, error.response?.data);
    throw new Error(error.message || 'Không thể lấy campusId từ API');
  }
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

    StorageService.setAccessToken(token);

    const mappedRole = ROLE_MAPPING[role] || role;
    const userData = {
      role: mappedRole,
      accountId,
      userName,
      isVerify,
    };

    // Chỉ lưu brandId nếu vai trò là brand
    if (mappedRole === "brand" && brandId) {
      userData.brandId = brandId;
      StorageService.setBrandId(brandId);
    } else {
      StorageService.setBrandId(''); // Xóa brandId nếu không phải vai trò brand
    }

    StorageService.setUser(userData);
    StorageService.setRoleLogin(mappedRole);
    StorageService.setNameLogin(userName);
    StorageService.setLoginId(accountId || '');

    if (mappedRole === 'campus') {
      try {
        const campusId = await fetchCampusByAccountId(accountId);
        StorageService.setCampusId(campusId || '');
        userData.campusId = campusId || '';
      } catch (error) {
        console.error('Failed to fetch campusId during login:', error.message);
        StorageService.setCampusId('');
        userData.campusId = '';
      } finally {
        window.dispatchEvent(new Event('campusIdUpdated'));
      }
    }

    StorageService.setItem
      ? StorageService.setItem('isVerify', isVerify)
      : localStorage.setItem('isVerify', JSON.stringify(isVerify));

    window.dispatchEvent(new Event('authChange'));

    return {
      success: true,
      data: {
        token,
        userName,
        loginId: accountId,
        role: mappedRole,
        brandId: mappedRole === "brand" ? brandId : null,
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
    if (!code) {
      return {
        success: false,
        message: "Vui lòng nhập mã xác minh!"
      };
    }

    const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_ACCOUNT, {
      id,
      email,
      code: code.toString()
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
    localStorage.setItem('isVerify', 'true');

    return {
      success: true,
      data: apiData,
    };
  } catch (error) {
    console.error('❌ Lỗi khi xác minh tài khoản:', error);
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

export const resendVerificationCode = async (email) => {
  try {
    const response = await apiClient.post(EMAIL_ENDPOINTS.SEND_CODE_EMAIL_AGAIN, {}, {
      params: { email }
    });

    if (response.status === 200) {
      toast.success("Đã gửi lại mã xác minh!");
      return {
        success: true
      };
    }

    return {
      success: false,
      message: response.data?.message || "Không thể gửi lại mã xác minh"
    };
  } catch (error) {
    console.error('❌ Lỗi khi gửi lại mã:', error);
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi khi gửi lại mã xác minh"
    };
  }
};