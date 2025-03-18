// store/api/areaApi.js
import apiClient from './apiClient'; // Giả sử apiClient nằm cùng thư mục, nếu không thì điều chỉnh path
import { AREA_ENDPOINTS } from './endpoints'; // Giả sử endpoints nằm cùng thư mục
import toast from 'react-hot-toast';

export const createAreaAPI = async (data) => {
  try {
    console.log("Calling createAreaAPI with data:", data);

    const formData = new FormData();
    formData.append("areaName", data.areaName);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("state", data.state === true ? "true" : "false");
    if (data.image) {
      formData.append("image", data.image);
    }

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await apiClient.post(AREA_ENDPOINTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("API Response:", response);
    // toast.success("Tạo khu vực thành công!");

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Create area error details:", {
      error: error,
      response: error.response,
      data: error.response?.data,
      message: error.message,
      stack: error.stack,
    });

    toast.error(error.message || "Tạo khu vực thất bại");
    throw {
      status: error.response?.status || 500,
      message: error.message || error.response?.data?.message || "Tạo khu vực thất bại",
      details: error.response?.data,
    };
  }
};

export const getAreasAPI = async ({ page = 1, size = 10, search = "", state = true, isAsc = true, brandId }) => {
  try {
    const validPage = Math.max(1, page);

    console.log("Fetching areas with params:", {
      page,
      size,
      search,
      state,
      isAsc,
      brandId,
    });

    const params = new URLSearchParams();
    params.append("page", validPage);
    params.append("size", size);

    if (search && search.trim() !== "") {
      params.append("search", search.trim());
    }

    params.append("state", state.toString());
    params.append("isAsc", isAsc.toString());
    if (brandId) {
      params.append("brandId", brandId);
    }

    const url = `${AREA_ENDPOINTS.GET_ALL}?${params}`;
    console.log(`Making request to: ${url}`);

    const response = await apiClient.get(url);
    console.log("Areas API raw response:", response.data);

    if (!response.data) {
      console.warn("No data received from API");
      return {
        status: response.status,
        data: {
          size,
          page,
          total: 0,
          totalPages: 0,
          items: [],
        },
      };
    }

    const responseData = {
      status: response.status,
      data: {
        size: response.data.size || size,
        page: response.data.page || page,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 0,
        items: Array.isArray(response.data.items) ? response.data.items : [],
      },
    };

    console.log("Processed response data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching areas:", error);
    console.error("Error response:", error.response?.data);

    return {
      status: error.response?.status || 500,
      data: {
        size: size,
        page: page,
        total: 0,
        totalPages: 0,
        items: [],
        message: error.response?.data?.message || "Lấy danh sách khu vực thất bại",
      },
    };
  }
};

export const getAreaByIdAPI = async (id) => {
  try {
    const response = await apiClient.get(
      AREA_ENDPOINTS.GET_BY_ID.replace("{id}", id)
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    toast.error(error.response?.data?.message || "Lấy chi tiết khu vực thất bại");
    return {
      status: error.response?.status || 500,
      data: {
        message: error.response?.data?.message || "Lấy chi tiết khu vực thất bại",
      },
    };
  }
};

export const updateAreaAPI = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("areaName", data.areaName);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("state", data.state === true ? "true" : "false");
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await apiClient.put(AREA_ENDPOINTS.UPDATE.replace("{id}", id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.success("Cập nhật khu vực thành công!");
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    toast.error(error.message || "Cập nhật khu vực thất bại");
    throw {
      status: error.response?.status || 500,
      message: error.message || error.response?.data?.message || "Cập nhật khu vực thất bại",
      details: error.response?.data,
    };
  }
};