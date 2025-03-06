import apiClient from "./apiClient";
import { REGISTER_ENDPOINTS } from "./endpoints";

export const registerBrandAPI = async (brandData) => {
  try {
    // Format data theo yêu cầu của API
    const formattedData = {
      userName: brandData.userName,
      password: brandData.password,
      phone: brandData.phone,
      email: brandData.email,
      brandName: brandData.brandName,
      acronym: brandData.acronym || "",
      address: brandData.address,
      coverPhoto: brandData.coverPhoto,
      link: brandData.link || "",
      openingHours: {
        hours: brandData.openingHours.hours,
        minutes: brandData.openingHours.minutes,
      },
      closingHours: {
        hours: brandData.closingHours.hours,
        minutes: brandData.closingHours.minutes,
      },
      description: brandData.description || "",
      state: true,
    };

    const response = await apiClient.post(
      REGISTER_ENDPOINTS.RegisterBrand,
      formattedData
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // Xử lý lỗi từ API
    const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
    return {
      status: error.response?.status || 500,
      data: { message: errorMessage },
    };
  }
};
