import axios from 'axios';
import storageService from '../../services/storageService';

const apiClient = axios.create({
  baseURL: 'https://swallet-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = storageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status || 500;
    return Promise.reject({ status, data: error.response?.data || error.message });
  }
);

export default apiClient;