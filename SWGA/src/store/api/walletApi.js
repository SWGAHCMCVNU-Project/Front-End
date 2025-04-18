import apiClient from './apiClient';
import storageService from '../../services/storageService';
import { WALLET } from './endpoints';

const walletService = {
  getWalletByBrandId: async () => {
    const brandId = storageService.getBrandId();
    try {
      if (!brandId) {
        console.warn('Brand ID not found in storage, returning default balance');
        return { balance: 0 };
      }

      const response = await apiClient.get(WALLET.GET_WALLET, {
        params: {
          brandId: brandId,
          type: 1,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet by brandId:', error);
      return { balance: 0 }; // Return default value instead of throwing
    }
  },
  getWalletByCampusId: async () => {
    try {
      const campusId = storageService.getCampusId();
      
      if (!campusId) {
        console.warn('Campus ID not found in storage, returning default balance');
        return { balance: 0 };
      }
      const response = await apiClient.get(WALLET.GET_WALLET_CAMPUS, {
        params: {
          campusId: campusId,
          type: 1,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet by campusId:', error);
      return { balance: 0 }; // Return default value instead of throwing
    }
  },
};

export default walletService;