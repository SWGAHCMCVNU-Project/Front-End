import apiClient from "./apiClient";
import { REGISTER_ENDPOINTS } from "./endpoints";
import RegisterService from "../../services/registerService"; // Import RegisterService

const registerService = new RegisterService(); // Tạo instance của RegisterService

export const registerBrandAPI = async (formData, coverPhoto, navigate) => {
  try {
    // Format dữ liệu từ UI bằng RegisterService trước khi gửi lên server
    const brandData = registerService.formatBrandData(formData, coverPhoto);

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
    apiFormData.append('openingHours.hours', brandData.openingHours.hours);
    apiFormData.append('openingHours.minutes', brandData.openingHours.minutes);
    apiFormData.append('closingHours.hours', brandData.closingHours.hours);
    apiFormData.append('closingHours.minutes', brandData.closingHours.minutes);
    apiFormData.append('description', brandData.description || '');
    apiFormData.append('state', brandData.state);

    // Gửi yêu cầu lên server
    const response = await apiClient.post(
      REGISTER_ENDPOINTS.RegisterBrand,
      apiFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    // Gọi Service để xử lý phản hồi từ server
    const result = await registerService.processRegisterResponse(response.data, navigate);

    return {
      status: response.status,
      success: result.success,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error('Register API Error:', error);
    const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};