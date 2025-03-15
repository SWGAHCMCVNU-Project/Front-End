// api/campaignTypeApi.js
import apiClient from './apiClient';
import { CAMPAIGN_TYPE_ENDPOINTS } from "./endpoints"; // Adjust path to endpoints.js
import toast from "react-hot-toast";

export const createCampaignType = async ({ typeName, description, image, state = true }) => {
  try {
    const formData = new FormData();
    formData.append("typeName", typeName || "");
    formData.append("description", description || "");
    formData.append("state", state);

    if (image) {
      formData.append("image", image, image.name);
    }

    const response = await apiClient.post(CAMPAIGN_TYPE_ENDPOINTS.CREATE, formData, {
      headers: {
        Accept: "text/plain",
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status < 200 || response.status >= 300) {
      toast.error("Tạo loại chiến dịch thất bại!");
      throw new Error("Invalid server response");
    }

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Campaign type API error:", error);
    toast.error(error.message || "Đã có lỗi xảy ra khi tạo loại chiến dịch!");
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Tạo loại chiến dịch thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const updateCampaignType = async (id, { typeName, description, image, state, status }) => {
  try {
    const formData = new FormData();
    formData.append("typeName", typeName || "");
    formData.append("description", description || "");
    formData.append("state", state);

    if (image) {
      formData.append("image", image, image.name);
    }
    if (status !== undefined) formData.append("status", status);

    const response = await apiClient.put(
      CAMPAIGN_TYPE_ENDPOINTS.UPDATE.replace("{id}", id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      toast.error("Cập nhật loại chiến dịch thất bại!");
      throw new Error("Invalid server response");
    }

    // toast.success("Cập nhật loại chiến dịch thành công!");
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Update campaign type API error:", error);
    toast.error(error.message || "Đã có lỗi xảy ra khi cập nhật loại chiến dịch!");
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Cập nhật loại chiến dịch thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const getAllCampaignTypes = async ({
  page = 1,
  size = 10,
  searchName = "", // Changed from search to searchName
  state = true,
  isAsc = true,
} = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    if (searchName && searchName.trim() !== "") {
      params.append("searchName", searchName.trim()); // Changed to searchName
    }
    params.append("state", state.toString());
    params.append("isAsc", isAsc.toString());

    const url = `${CAMPAIGN_TYPE_ENDPOINTS.GET_ALL}?${params}`;
    const response = await apiClient.get(url);

    if (!response.data) {
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
        items: Array.isArray(response.data.items)
          ? response.data.items.map((type) => ({
              id: type.id || "",
              typeName: type.typeName || "",
              image: type.image || "",
              fileName: type.fileName || "",
              dateCreated: type.dateCreated || "",
              dateUpdated: type.dateUpdated || "",
              description: type.description || "",
              state: type.state ?? true,
              status: type.status ?? true,
              numberOfCampaign: type.numberOfCampaign || 0,
            }))
          : [],
      },
    };

    return responseData;
  } catch (error) {
    console.error("Error in getAllCampaignTypes:", error);
    toast.error(error.message || "Đã có lỗi xảy ra khi lấy danh sách loại chiến dịch!");
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Lấy danh sách loại chiến dịch thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const getCampaignTypeById = async (id) => {
  try {
    const response = await apiClient.get(
      CAMPAIGN_TYPE_ENDPOINTS.GET_BY_ID.replace("{id}", id)
    );

    if (response.status < 200 || response.status >= 300) {
      toast.error("Lấy thông tin loại chiến dịch thất bại!");
      throw new Error("Invalid server response");
    }

    const responseData = {
      status: response.status,
      data: {
        id: response.data.id || "",
        typeName: response.data.typeName || "",
        image: response.data.image || "",
        fileName: response.data.fileName || "",
        dateCreated: response.data.dateCreated || "",
        dateUpdated: response.data.dateUpdated || "",
        description: response.data.description || "",
        state: response.data.state ?? true,
        status: response.data.status ?? true,
        numberOfCampaign: response.data.numberOfCampaign || 0,
      },
    };

    return responseData;
  } catch (error) {
    console.error("Error in getCampaignTypeById:", error);
    toast.error(error.message || "Đã có lỗi xảy ra khi lấy thông tin loại chiến dịch!");
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Lấy thông tin loại chiến dịch thất bại",
      details: error.response?.data || error.message,
    };
  }
};