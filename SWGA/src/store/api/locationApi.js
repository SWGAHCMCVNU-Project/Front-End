import apiClient from './apiClient';
import { LOCATION } from './endpoints';

const locationApi = {
  // Tạo mới location
  createLocation: async (locationData) => {
    try {
      const response = await apiClient.post(LOCATION.CREATE, locationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy tất cả locations
  getAllLocations: async () => {
    try {
      const response = await apiClient.get(LOCATION.GET_ALL);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật location
  updateLocation: async (locationData) => {
    try {
      const response = await apiClient.put(LOCATION.UPDATE, locationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default locationApi;