import apiClient from './apiClient';
import { RANKING } from './endpoints';

// API để lấy xếp hạng sinh viên (admin)
export const getStudentRankingAdmin = async (id) => {
  try {
    const response = await apiClient.get(RANKING.RANKING_STUDENT_ADMIN.replace('{id}', id));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy xếp hạng sinh viên (admin)');
  }
};

// API để lấy xếp hạng thương hiệu (admin)
export const getBrandRankingAdmin = async (id) => {
  try {
    const response = await apiClient.get(RANKING.RANKING_BRAND_ADMIN.replace('{id}', id));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy xếp hạng thương hiệu (admin)');
  }
};

// API để lấy xếp hạng sinh viên theo thương hiệu
export const getStudentRankingBrand = async (id) => {
  try {
    const response = await apiClient.get(RANKING.RANKING_STUDENT_BRAND.replace('{id}', id));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy xếp hạng sinh viên theo thương hiệu');
  }
};

// API để lấy xếp hạng chiến dịch (brand)
export const getCampaignRankingBrand = async (id) => {
  try {
    const response = await apiClient.get(RANKING.RANKING_CAMPAIGN_BRAND.replace('{id}', id));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy xếp hạng chiến dịch (brand)');
  }
};