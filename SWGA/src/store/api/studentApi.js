import apiClient from './apiClient';
import { STUDENT } from './endpoints';


export const getAllStudents = async ({ page = 1, size = 10, search = "" } = {}) => {
    try {
      const response = await apiClient.get(STUDENT.GET_ALL, {
        params: { page, size, search },
      });
      
      
      return response.data;
    } catch (error) {
      console.error('Error fetching all students:', error);
      throw error;
    }
  };

export const getStudentById = async (id) => {
  try {
    const response = await apiClient.get(STUDENT.GET_BY_ID.replace('{id}', id));
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    throw error;
  }
};
export const updateStudent = async (accountId, state) => {
  try {
    const response = await apiClient.put(
      STUDENT.UPDATE.replace("{id}", accountId),
      {}, // Body trống (nếu server không yêu cầu)
      {
        params: { state }, // Gửi state qua query parameter
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error.response?.data || error);
    throw error;
  }
};