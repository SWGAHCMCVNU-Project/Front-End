import apiClient from './apiClient'; // Giả sử apiClient nằm trong file bạn đã cung cấp
import { PAYMENT } from './endpoints'; // Giả sử các endpoint được export từ file endpoints.js


export const purchasePoints = async (pointPackageId, campusId) => {
    try {
      // Tạo payload từ dữ liệu đầu vào
      const payload = {
        pointPackageId: pointPackageId,
        campusId: campusId,
      };
  
      // Gọi API sử dụng apiClient
      const response = await apiClient.post(PAYMENT.CREATE_PAYMENT, payload);
  
      // Trả về dữ liệu từ response
      return response.data;
    } catch (error) {
      // Xử lý lỗi
      console.error('Error purchasing points:', error);
      throw error.response?.data || error.message;
    }
  };
  
  // Ví dụ sử dụng hàm purchasePoints
  const buyPoints = async () => {
    try {
      const pointPackageId = "12345"; // Thay bằng ID thực tế
      const campusId = "67890"; // Thay bằng ID thực tế
      const result = await purchasePoints(pointPackageId, campusId);
      console.log('Purchase successful:', result);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };