import axios from 'axios';
import storageService from '../../services/storageService';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SWALLET_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Trả về response đầy đủ thay vì chỉ response.data
  },
  (error) => {
    console.error('API Error details:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
      config: error.config,
    });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = storageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;