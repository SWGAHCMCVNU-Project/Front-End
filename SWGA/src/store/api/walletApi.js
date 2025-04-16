import apiClient from './apiClient';
import storageService from '../../services/storageService';
import { WALLET } from './endpoints';

const walletService = {
  getWalletByBrandId: async () => {
    try {
      const brandId = storageService.getBrandId();
      
      if (!brandId) {
        throw new Error('Brand ID not found in storage');
      }
      const response = await apiClient.get(WALLET.GET_WALLET, {
        params: {
          brandId: brandId,
          type: 1
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet by brandId:', error);
      throw error;
    }
  },
  getWalletByCampusId: async () => {
    try {
      const campusId = storageService.getCampusId();
      
      if (!campusId) {
        throw new Error('Campus ID not found in storage');
      }
      const response = await apiClient.get(WALLET.GET_WALLET_CAMPUS, {
        params: {
          campusId: campusId,
          type: 1
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet by campusId:', error);
      throw error;
    }
  },
};

export default walletService;