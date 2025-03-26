import apiClient from "./apiClient";
import { LUCKY_PRIZE } from "./endpoints";

export const createLuckyPrizeAPI = async (prizeData) => {
  try {
    const response = await apiClient.post(LUCKY_PRIZE.CREATE, prizeData);
    return {
      status: response.status,
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Create Lucky Prize Error:", error);
    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "Tạo giải thưởng thất bại"
    };
  }
};

export const getAllLuckyPrizesAPI = async () => {
  try {
    const response = await apiClient.get(LUCKY_PRIZE.GET_ALL);
    return {
      status: response.status,
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Get All Lucky Prizes Error:", error);
    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "Lấy danh sách giải thưởng thất bại"
    };
  }
};

export const getLuckyPrizeByIdAPI = async (id) => {
  try {
    const response = await apiClient.get(LUCKY_PRIZE.GET_BY_ID.replace("{id}", id));
    return {
      status: response.status,
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error(`Get Lucky Prize ${id} Error:`, error);
    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "Lấy thông tin giải thưởng thất bại"
    };
  }
};

export const updateLuckyPrizeAPI = async (id, prizeData) => {
    try {
      const response = await apiClient.put(
        LUCKY_PRIZE.UPDATE.replace("{id}", String(id)),
        prizeData,
        {
          headers: {
            "Content-Type": "application/json" // Thêm header này
          }
        }
      );
      return {
        status: response.status,
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Update Lucky Prize ${id} Error:`, error);
      return {
        status: error.response?.status || 500,
        success: false,
        message: error.response?.data?.message || "Cập nhật giải thưởng thất bại"
      };
    }
  };

