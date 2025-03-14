// store/api/registerApi.js
import apiClient from "./apiClient";
import { REGISTER_ENDPOINTS } from "./endpoints";
import toast from 'react-hot-toast';

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
      REGISTER_ENDPOINTS.RegisterBrand,
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