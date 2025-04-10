import apiClient from './apiClient';
import { CHALLENGE } from './endpoints';

// Create a new challenge
export const createChallenge = async (challengeData) => {
  try {
    const response = await apiClient.post(CHALLENGE.CREATE, challengeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all challenges with pagination and filtering
export const getAllChallenges = async ({ page = 1, size = 10, search = '', status = null } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    if (search) params.append('search', search);
    if (status !== null) params.append('status', status ? 'active' : 'inactive');

    const response = await apiClient.get(`${CHALLENGE.GET_ALL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a challenge by ID
export const updateChallenge = async (id, challengeData) => {
  try {
    const response = await apiClient.put(CHALLENGE.UPDATE.replace('{id}', id), challengeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};