import axiosInstance from '../store/api/axiosInstance';
import { ENDPOINTS } from '../store/api/endpoints';

export const registerService = {
  registerBrand: (formData) => {
    return axiosInstance.post(ENDPOINTS.account.registerBrand(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};