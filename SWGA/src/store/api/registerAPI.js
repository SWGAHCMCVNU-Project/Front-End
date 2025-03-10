import apiClient from "./apiClient";
import { REGISTER_ENDPOINTS } from "./endpoints";

export const registerBrandAPI = async (brandData) => {
  try {
    // Tạo FormData object
    const formData = new FormData();
    
    // Thêm các trường dữ liệu vào FormData
    formData.append('userName', brandData.userName);
    formData.append('password', brandData.password);
    formData.append('phone', brandData.phone);
    formData.append('email', brandData.email);
    formData.append('brandName', brandData.brandName);
    formData.append('acronym', brandData.acronym || '');
    formData.append('address', brandData.address);
    
    // Xử lý ảnh: Chuyển base64 thành file
    if (brandData.coverPhoto) {
      const base64Response = await fetch(brandData.coverPhoto);
      const blob = await base64Response.blob();
      formData.append('coverPhoto', blob, 'cover.jpg');
    }
    
    formData.append('link', brandData.link || '');
    formData.append('openingHours.hours', brandData.openingHours.hours);
    formData.append('openingHours.minutes', brandData.openingHours.minutes);
    formData.append('closingHours.hours', brandData.closingHours.hours);
    formData.append('closingHours.minutes', brandData.closingHours.minutes);
    formData.append('description', brandData.description || '');
    formData.append('state', brandData.state);

    const response = await apiClient.post(
      REGISTER_ENDPOINTS.RegisterBrand,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error('Register API Error:', error);
    const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
    return {
      status: error.response?.status || 500,
      data: { message: errorMessage },
    };
  }
};
