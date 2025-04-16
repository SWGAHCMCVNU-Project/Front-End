import apiClient from "./apiClient";
import { LECTURER } from "./endpoints";

export const getLecturersByCampusAPI = async ({
  campusId,
  searchName = "",
  page = 1,
  size = 10,
} = {}) => {
  try {
    const response = await apiClient.get(LECTURER.GET_ALL, {
      params: {
        searchName,
        page,
        size,
        ...(campusId && { campusId }), // Include campusId only if provided
      },
    });

    if (response.data) {
      return { status: response.status, success: true, data: response.data };
    } else {
      return { status: response.status, success: false, message: "Không nhận được dữ liệu từ server!" };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Lấy danh sách giảng viên thất bại";
    return { status: error.response?.status || 500, success: false, message: errorMessage };
  }
};