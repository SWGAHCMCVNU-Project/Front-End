// walletApi.js
import apiClient from './apiClient';
import storageService from '../../services/storageService';
import { WALLET } from './endpoints';
import { getBrandByAccountIdAPI } from './brandApi'; // Import hàm getBrandByAccountIdAPI

const walletService = {
  getWalletByBrandId: async () => {
    try {
      // Lấy brandId từ StorageService
      let brandId = storageService.getBrandId();

      // Nếu không có brandId trong storage, gọi API để lấy
      if (!brandId) {
        const brandData = await getBrandByAccountIdAPI();
        if (brandData && brandData.id) {
          brandId = brandData.id;
        } else {
          console.warn('Cannot retrieve brand ID');
          return { balance: 0 };
        }
      }

      // Gọi API lấy ví với brandId
      const response = await apiClient.get(WALLET.GET_WALLET, {
        params: {
          brandId: brandId,
          type: 1, // Giả sử type=1 là loại ví brand
        },
      });

      return response.data || { balance: 0 };
    } catch (error) {
      console.error('Error fetching wallet by brandId:', error);
      return { balance: 0 };
    }
  },

  getWalletByCampusId: async (campusId) => {
    try {
      if (!campusId) {
        console.warn('Campus ID is required');
        return { balance: 0 };
      }

      const response = await apiClient.get(WALLET.GET_WALLET_CAMPUS, {
        params: {
          campusId: campusId,
          type: 1, // Giả sử type=1 là loại ví campus
        },
      });

      return response.data || { balance: 0 };
    } catch (error) {
      console.error('Error fetching wallet by campusId:', error);
      return { balance: 0 };
    }
  },
};

export default walletService;