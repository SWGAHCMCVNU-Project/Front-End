import apiClient from "./apiClient";
import { CAMPAIGN_ENDPOINTS } from "./endpoints";

// Hàm lấy danh sách tất cả các chiến dịch (giữ nguyên)
export const getAllCampaignsAPI = async ({ sort, searchName, page, limit, brandIds, campaignTypeIds, statesFilterValue }) => {
  try {
    const params = new URLSearchParams();
    if (sort) params.append('sort', sort);
    if (searchName) params.append('searchName', searchName); // Thay search thành searchName
    if (page) params.append('page', page);
    if (limit) params.append('size', limit);
    if (brandIds && Array.isArray(brandIds)) params.append('brandIds', brandIds.join(','));
    if (campaignTypeIds && Array.isArray(campaignTypeIds)) params.append('campaignTypeIds', campaignTypeIds.join(','));
    if (statesFilterValue) params.append('statesFilterValue', statesFilterValue);

    const response = await apiClient.get(`${CAMPAIGN_ENDPOINTS.GET_ALL}?${params.toString()}`);
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

    console.log("Params received in createCampaignAPI:", params);

    if (
      !brandId ||
      !typeId ||
      !campaignName ||
      !condition ||
      !startOn ||
      !endOn ||
      totalIncome === undefined ||
      !description ||
      !Array.isArray(storeIds) ||
      storeIds.length === 0
    ) {
      console.log("Missing fields:", {
        brandId,
        typeId,
        campaignName,
        condition,
        startOn,
        endOn,
        totalIncome,
        description,
        storeIds,
      });
      throw new Error("Missing required parameters");
    }

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
    if (image) formData.append("image", image); // Thêm file ảnh nếu có
    if (campaignDetails) formData.append("campaignDetails", JSON.stringify(campaignDetails)); // Thêm campaignDetails nếu có
    // Debug formData
    for (let pair of formData.entries()) {
      console.log("FormData entry:", pair[0], pair[1]);
    }

    console.log("Query params:", queryParams.toString());

    const response = await apiClient.post(
      `${CAMPAIGN_ENDPOINTS.CREATE}?${queryParams.toString()}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Log response để kiểm tra campaign vừa tạo
    console.log("Create Campaign Response:", response.data);

    return response.data;
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

    console.log("Params received in updateCampaignAPI:", params);

    // Chỉ yêu cầu các trường chắc chắn có từ form
    if (!typeId || !campaignName || !condition || !description) {
      console.log("Missing required fields:", {
        typeId,
        campaignName,
        condition,
        description,
      });
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
    if (totalIncome !== undefined) queryParams.append("totalIncome", totalIncome);
    if (description) queryParams.append("description", description);

    // Gửi storeIds nếu có, không bắt buộc
    if (Array.isArray(storeIds) && storeIds.length > 0) {
      storeIds.forEach((storeId) => {
        queryParams.append("storeIds", storeId);
      });
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (campaignDetails) formData.append("campaignDetails", JSON.stringify(campaignDetails));

    console.log("Query params:", queryParams.toString());
    console.log("Form data:", formData);

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