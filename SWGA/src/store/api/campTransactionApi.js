import apiClient from "./apiClient";
import { CAMP_TRANSATION } from "./endpoints";

export const getCampTransactions = async ({ brandId, page = 1, size = 10 }) => {
  try {
    const response = await apiClient.get(CAMP_TRANSATION.HISTORY_OF_CAMP_TRANSATION, {
      params: {
        brandId, // Fixed: Changed from "brand" to "brandId"
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch campaign transactions");
  }
};