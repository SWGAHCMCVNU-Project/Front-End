// store/api/registerApi.js
import apiClient from "./apiClient";
import { ACCOUNT_ENDPOINTS } from "./endpoints";
import toast from 'react-hot-toast';
import StorageService from "../../services/storageService"
export const registerBrandAPI = async (formData, coverPhoto, navigate) => {
  try {
    // Định dạng dữ liệu từ UI trước khi gửi lên server
    const formatBrandData = (formData, coverPhoto) => {
      const [openingHours, openingMinutes] = formData.openingHours.split(':');
      const [closingHours, closingMinutes] = formData.closingHours.split(':');

      return {
        userName: formData.userName,
        password: formData.password,
        phone: formData.phone,
        email: formData.email,
        brandName: formData.brandName,
        acronym: formData.acronym || "",
        address: formData.address,
        coverPhoto: coverPhoto,
        link: formData.link || "",
        openingHours: `${openingHours.padStart(2, '0')}:${openingMinutes.padStart(2, '0')}:00`, // Định dạng "HH:mm:ss"
        closingHours: `${closingHours.padStart(2, '0')}:${closingMinutes.padStart(2, '0')}:00`, // Định dạng "HH:mm:ss"
        description: formData.description || "",
        state: true
      };
    };

    // Format dữ liệu từ UI
    const brandData = formatBrandData(formData, coverPhoto);

    // Tạo FormData object
    const apiFormData = new FormData();
    apiFormData.append('userName', brandData.userName);
    apiFormData.append('password', brandData.password);
    apiFormData.append('phone', brandData.phone);
    apiFormData.append('email', brandData.email);
    apiFormData.append('brandName', brandData.brandName);
    apiFormData.append('acronym', brandData.acronym || '');
    apiFormData.append('address', brandData.address);

    // Xử lý ảnh: Chuyển base64 thành file
    if (brandData.coverPhoto) {
      const base64Response = await fetch(brandData.coverPhoto);
      const blob = await base64Response.blob();
      apiFormData.append('coverPhoto', blob, 'cover.jpg');
    }

    apiFormData.append('link', brandData.link || '');
    apiFormData.append('openingHours', brandData.openingHours); // Gửi trực tiếp chuỗi HH:mm:ss
    apiFormData.append('closingHours', brandData.closingHours); // Gửi trực tiếp chuỗi HH:mm:ss
    apiFormData.append('description', brandData.description || '');
    apiFormData.append('state', brandData.state);

    // Gửi yêu cầu lên server
    const response = await apiClient.post(
      ACCOUNT_ENDPOINTS.RegisterBrand,
      apiFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    // Xử lý phản hồi từ API
    if (response.data) { // Giả sử server trả về dữ liệu thành công
      toast.success('Đăng ký thành công!');
      navigate('/sign-in', { replace: true });
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      toast.error('Đăng ký thất bại!');
      return {
        status: response.status,
        success: false,
        message: 'Không nhận được dữ liệu từ server!',
      };
    }
  } catch (error) {
    console.error('Register API Error:', error);
    const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
    toast.error(errorMessage);
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};



export const registerStore = async (formData) => {
  try {
    // Lấy brandId từ StorageService
    const brandIdFromStorage = StorageService.getBrandId();
    console.log("brandId from StorageService:", brandIdFromStorage);

    // Tách dữ liệu thành query parameters
    const queryParams = new URLSearchParams({
      brandId: brandIdFromStorage || formData.brandId || "",
      areaId: formData.areaId || "",
      storeName: formData.storeName || "",
      phone: formData.storePhone || formData.phone || "", // Dùng phone từ form
      email: formData.storeEmail || formData.email || "", // Dùng email từ form
      address: formData.address || "",
      hour: formData.hour || 0,
      minute: formData.minute || 0,
      description: formData.description || "",
      state: formData.state !== undefined ? formData.state : true,
    });

    // Chuẩn bị FormData cho body
    const data = new FormData();
    data.append("userName", formData.userName || "");
    data.append("password", formData.password || "");
    data.append("phone", formData.accountPhone || formData.phone || ""); // Phone trong body
    data.append("email", formData.accountEmail || formData.email || ""); // Email trong body
    if (formData.avatar && formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    // Log để kiểm tra
    console.log("Query Params:", queryParams.toString());
    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Gửi yêu cầu với query parameters và body
    const url = `${ACCOUNT_ENDPOINTS.RegisterStore}?${queryParams.toString()}`;
    const response = await apiClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "text/plain", // Thêm header giống curl nếu cần
      },
    });

    // Xử lý phản hồi từ API
    if (response.data) {
      toast.success("Đăng ký store thành công!");
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      toast.error("Đăng ký store thất bại!");
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error("Register Store API Error:", error.response?.data || error);
    const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký store";
    toast.error(errorMessage);
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};




// store/api/registerApi.js (updated getAccountByIdAPI)

export const getAccountByIdAPI = async (id) => {
  try {
    const accountId = id || StorageService.getAccountId();
    if (!accountId) {
      console.error("Account ID is missing!");
      return {
        status: 400,
        success: false,
        message: "Account ID is required!",
      };
    }

    console.log("Fetching account details for ID:", accountId);

    const response = await apiClient.get(
      ACCOUNT_ENDPOINTS.AccountDetail.replace("{id}", accountId)
    );

    if (response.data) {
      console.log("Account details fetched successfully:", response.data);
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      console.warn("No data received from server for account ID:", accountId);
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error("Get Account By ID API Error:", error.response?.data || error);
    const errorMessage = error.response?.data?.message || "Lấy thông tin tài khoản thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};

export const updateAccountIdAPI = async (id, oldPassword, updatedData, navigate) => {
  try {
    const accountId = id || StorageService.getAccountId();
    if (!accountId) {
      toast.error("Account ID is required!");
      return {
        status: 400,
        success: false,
        message: "Account ID is required!",
      };
    }

    const queryParams = new URLSearchParams({
      oldPassword: oldPassword || "",
    }).toString();

    const requestBody = {
      userName: updatedData.userName || "",
      password: updatedData.password || "",
      phone: updatedData.phone || "",
      email: updatedData.email || "",
    };

    console.log("Updating account with ID:", accountId);
    console.log("Request Body:", requestBody);

    const response = await apiClient.put(
      `${ACCOUNT_ENDPOINTS.UPDATEACCOUNT.replace("{id}", accountId)}?${queryParams}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data) {
      // toast.success("Account updated successfully!");
      navigate && navigate(); // `navigate` is `onCloseModal` (refetch function)
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      toast.error("Account update failed!");
      return {
        status: response.status,
        success: false,
        message: "No data received from server!",
      };
    }
  } catch (error) {
    console.error("Update Account API Error:", error.response?.data || error);
    const errorMessage = error.response?.data?.message || "Failed to update account";
    toast.error(errorMessage);
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};