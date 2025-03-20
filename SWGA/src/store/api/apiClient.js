import axios from 'axios';
import storageService from '../../services/storageService';

const apiClient = axios.create({
  baseURL: 'https://swallet-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

apiClient.interceptors.request.use(
  (config) => {
    const token = storageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
  
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error (e.g., redirect to login)
      storageService.clearAll();
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default apiClient;