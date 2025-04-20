// walletApi.js
import apiClient from './apiClient';
import storageService from '../../services/storageService';
import { WALLET } from './endpoints';

const walletService = {
  getWalletByBrandId: async (brandId) => {
    try {
      if (!brandId) {
        console.warn('Brand ID is required');
        return { balance: 0 };
      }

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