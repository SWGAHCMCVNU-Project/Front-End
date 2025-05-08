import apiClient from "./apiClient";
import { CAMPAIGN_ENDPOINTS } from "./endpoints";

// Hàm lấy danh sách tất cả các chiến dịch (giữ nguyên)
export const getAllCampaignsAPI = async ({
  sort,
  searchName,
  page,
  limit,

  campaignTypeIds,
  statesFilterValue,
}) => {
  try {
    const response = await apiClient.get(CAMPAIGN_ENDPOINTS.GET_ALL, {
      params: {
        sort,
        searchName,
        page,
        size: limit,

        campaignTypeIds: campaignTypeIds?.join(","),
        statesFilterValue,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching all campaigns:", error);
    throw error;
  }
};


export const getAllCampaignsAdminAPI = async ({
  sort,
  searchName,
  page,
  limit,

}) => {
  try {
    const response = await apiClient.get(CAMPAIGN_ENDPOINTS.GET_ALL_CAMPAIGN, {
      params: {
        sort,
        searchName,
        page,
        size: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching all campaigns:", error);
    throw error;
  }
};

// Hàm lấy thông tin chiến dịch theo ID (giữ nguyên)
export const getCampaignByIdAPI = async (id) => {
  try {
    if (!id) {
      throw new Error("Campaign ID is required");
    }
    const url = CAMPAIGN_ENDPOINTS.GET_BY_ID.replace("{id}", id);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign with ID ${id}:`, error);
    throw error;
  }
};

// Hàm tạo chiến dịch mới (giữ nguyên)
export const createCampaignAPI = async (params) => {
  try {
    const {
      brandId,
      typeId,
      campaignName,
      condition,
      link,
      startOn,
      endOn,
      totalIncome,
      description,
      storeIds,
      image,
      campaignDetails,
    } = params;

    // Tạo query string cho các trường không phải file
    const queryParams = new URLSearchParams();
    queryParams.append("brandId", brandId);
    queryParams.append("typeId", typeId);
    queryParams.append("campaignName", campaignName);
    queryParams.append("condition", condition);
    if (link) queryParams.append("link", link);
    queryParams.append("startOn", startOn);
    queryParams.append("endOn", endOn);
    queryParams.append("totalIncome", totalIncome);
    queryParams.append("description", description);
    storeIds.forEach((storeId) => {
      queryParams.append("storeIds", storeId);
    });

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (campaignDetails) formData.append("campaignDetails", campaignDetails);

    const response = await apiClient.post(
      `${CAMPAIGN_ENDPOINTS.CREATE}?${queryParams.toString()}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating campaign:", error);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};
// Hàm cập nhật chiến dịch theo ID (sửa đổi)
export const updateCampaignAPI = async (id, params) => {
  try {
    if (!id) {
      throw new Error("Campaign ID is required");
    }

    const {
      brandId,
      typeId,
      campaignName,
      condition,
      link,
      startOn,
      endOn,
      totalIncome,
      description,
      storeIds,
      image,
      campaignDetails,
    } = params;

    // console.log("Params received in updateCampaignAPI:", params);

    // Chỉ yêu cầu các trường chắc chắn có từ form
    if (!typeId || !campaignName || !condition || !description) {
      // console.log("Missing required fields:", {
      //   typeId,
      //   campaignName,
      //   condition,
      //   description,
      // });
      throw new Error("Missing required parameters");
    }

    const queryParams = new URLSearchParams();
    if (brandId) queryParams.append("brandId", brandId);
    if (typeId) queryParams.append("typeId", typeId);
    if (campaignName) queryParams.append("campaignName", campaignName);
    if (condition) queryParams.append("condition", condition);
    if (link) queryParams.append("link", link);
    if (startOn) queryParams.append("startOn", startOn);
    if (endOn) queryParams.append("endOn", endOn);
    if (totalIncome !== undefined)
      queryParams.append("totalIncome", totalIncome);
    if (description) queryParams.append("description", description);

    // Gửi storeIds nếu có, không bắt buộc
    if (Array.isArray(storeIds) && storeIds.length > 0) {
      storeIds.forEach((storeId) => {
        queryParams.append("storeIds", storeId);
      });
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (campaignDetails)
      formData.append("campaignDetails", JSON.stringify(campaignDetails));

    // console.log("Query params:", queryParams.toString());
    // console.log("Form data:", formData);

    const url = CAMPAIGN_ENDPOINTS.UPDATE.replace("{id}", id);
    const response = await apiClient.put(
      `${url}?${queryParams.toString()}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error updating campaign with ID ${id}:`, error);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};
export const getCampaignsByBrandIdAPI = async (
  brandId,
  { page = 1, size = 10, searchName = "", campaignTypeIds, statesFilterValue } = {}
) => {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required");
    }

    const url = CAMPAIGN_ENDPOINTS.GET_CAMPAIGN_BY_ID.replace("{id}", brandId);
    const response = await apiClient.get(url, {
      params: {
        page,
        size,
        searchName,
        campaignTypeIds: campaignTypeIds?.join(","),
        statesFilterValue,
      },
    });

    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(`Error fetching campaigns for brand ${brandId}:`, error);
    const errorMessage =
      error.response?.data?.message || "Lấy danh sách chiến dịch theo thương hiệu thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};
export const changeCampaignStatusAPI = async ({ campaignId, isApproved, rejectionReason }) => {
  try {
    if (!campaignId) {
      throw new Error("Campaign ID is required");
    }

    const queryParams = new URLSearchParams();
    queryParams.append("campaignId", campaignId);
    queryParams.append("isApproved", isApproved);
    if (rejectionReason) queryParams.append("rejectionReason", rejectionReason);

    const response = await apiClient.put(
      `${CAMPAIGN_ENDPOINTS.CHANGE_STATUS_OF_CAMPAIGN}?${queryParams.toString()}`
    );

    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(`Error changing status for campaign ${campaignId}:`, error);
    const errorMessage =
      error.response?.data?.message || "Thay đổi trạng thái chiến dịch thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};