import axiosInstance from '../store/api/axiosInstance';
import { ENDPOINTS } from '../store/api/endpoints';

export const authService = {
  login: (credentials) => {
    return axiosInstance.post(ENDPOINTS.auth.login(), credentials);
  },
  
};