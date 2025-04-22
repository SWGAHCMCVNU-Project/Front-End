import apiClient from './apiClient';
import { PAYMENT } from './endpoints';

// API cho campus mua điểm
export const purchasePointsCampus = async (pointPackageId, campusId, brandId = null) => {
  try {
    const payload = {
      pointPackageId,
      campusId,
      brandId, // brandId sẽ là null cho campus
    };

    const response = await apiClient.post(PAYMENT.CREATE_PAYMENT_CAMPUS, payload);
    return response.data;
  } catch (error) {
    console.error('Error purchasing points for campus:', error);
    throw error.response?.data || error.message;
  }
};

// API cho brand mua điểm
export const purchasePointsBrand = async (pointPackageId, campusId = null, brandId) => {
  try {
    const payload = {
      pointPackageId,
      campusId, // campusId sẽ là null cho brand
      brandId,
    };

    const response = await apiClient.post(PAYMENT.CREATE_PAYMENT_BRAND, payload);
    return response.data;
  } catch (error) {
    console.error('Error purchasing points for brand:', error);
    throw error.response?.data || error.message;
  }
};
export const getPurchaseHistory = async ({ id = null,  } = {}) => {
  try {
    const params = new URLSearchParams();
    if (id) params.append("id", id);
    // Bỏ campusId và brandId nếu không cần thiết
    const url = `${PAYMENT.GET_HISTORY_PURCHASE}?${params.toString()}`;
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    throw error.response?.data || error.message;
  }
};