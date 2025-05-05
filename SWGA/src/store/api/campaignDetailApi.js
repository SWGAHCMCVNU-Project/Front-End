import apiClient from "./apiClient";
import {
  CAMPAIGN_DETAIL_ENDPOINTS,
  CAMPAIGN_ENDPOINTS,
  VOUCHER_ENDPOINTS,
  VOUCHER_ITEM_ENDPOINTS,
} from "./endpoints";

export const getVouchersByCampaignId = async (
  campaignId,
  searchName = "",
  page = 1,
  size = 10
) => {
  try {
    

    const response = await apiClient.get(
      VOUCHER_ENDPOINTS.GET_VOUCHER_BY_ID.replace("{id}", campaignId),
      {
        params: {
          searchName,
          page,
          size,
        },
      }
    );


    // Kiểm tra nếu response.data là null hoặc undefined
    if (!response.data) {
      console.warn(
        "API returned null/undefined data for campaignId:",
        campaignId
      );
      return {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
      };
    }

    // Format lại dữ liệu voucher từ response
    const items = response.data.items || response.data;
    const formattedItems = Array.isArray(items)
      ? items.map((item) => ({
          id: item.id || "",
          brandId: item.brandId || "",
          brandName: item.brandName || "Thương hiệu không rõ",
          typeId: item.typeId || "",
          typeName: item.typeName || "Loại không rõ",
          voucherName: item.voucherName || "Voucher không tên",
          price: item.price || 0,
          rate: item.rate || 0,
          condition: item.condition || "",
          voucherImage: item.image || "",
          image: item.image || "",
          imageName: item.imageName || "",
          file: item.file || "",
          fileName: item.fileName || "",
          dateCreated: item.dateCreated || null,
          dateUpdated: item.dateUpdated || null,
          description: item.description || "",
          state: item.state || false,
          status: item.status || false,
          quantity: item.numberOfItems || 0,
          quantityInStock: item.numberOfItemsAvailable || 0,
        }))
      : [];


    const result = {
      items: formattedItems,
      total: response.data.total || formattedItems.length,
      page: response.data.page || page,
      totalPages:
        response.data.totalPages || Math.ceil(formattedItems.length / size),
    };

    return result;
  } catch (error) {
    console.error("Error fetching vouchers:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    throw error;
  }
};

export const getVoucherDetailById = async (id) => {
  try {
    const response = await apiClient.get(
      CAMPAIGN_DETAIL_ENDPOINTS.GET_VOUCHER_BY_ID.replace("{id}", id)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching voucher detail:", error.message);
    throw error;
  }
};

export const getStoresByCampaignId = async (
  campaignId,
  searchName = "",
  page = 1,
  size = 10
) => {
  try {
    

    const response = await apiClient.get(
      CAMPAIGN_ENDPOINTS.GET_STORE_BY_ID.replace("{id}", campaignId),
      {
        params: {
          searchName,
          page,
          size,
        },
      }
    );


    // Kiểm tra nếu response.data là null hoặc undefined
    if (!response.data) {
      console.warn(
        "API returned null/undefined data for campaignId:",
        campaignId
      );
      return {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
      };
    }

    // Format lại dữ liệu store từ response
    const items = response.data.items || response.data;
    const formattedItems = Array.isArray(items)
    ? items.map((item) => ({
        id: item.id || "",
        storeName: item.storeName || "Cửa hàng không tên",
        brandName: item.brandName || "Thương hiệu không rõ", // Add this
        email: item.email || "Chưa cập nhật",
        phone: item.phone || "Chưa cập nhật",
        address: item.address || "Chưa cập nhật",
        openingHours: item.openingHours || "00:00",
        closingHours: item.closingHours || "00:00",
        state: item.state || false,
        campaignStoreId: item.id || "",
        file: item.file || "", 
      }))
    : [];

    const result = {
      items: formattedItems,
      total: response.data.total || formattedItems.length,
      page: response.data.page || page,
      totalPages:
        response.data.totalPages || Math.ceil(formattedItems.length / size),
    };

    return result;
  } catch (error) {
    console.error("Error fetching campaign stores:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    throw error;
  }
};

export const getVoucherItemsByCampaignId = async ({
  campaignDetailId,
  state = null,
  sort = "Id,desc",
  search = "",
  page = 1,
  limit = 10,
  isLocked = null,
  isBought = null,
  isUsed = null,
}) => {
  try {
    const campaignDetailIds = Array.isArray(campaignDetailId)
      ? campaignDetailId
      : [campaignDetailId];

    const params = {
      campaignDetailId: campaignDetailIds,
      pageNumber: page,  // Đảm bảo tên param đúng với API
      pageSize: limit,   // Đảm bảo tên param đúng với API
    };

    if (state !== null) params.state = state;
    if (sort) params.sort = sort;
    if (search) params.searchName = search;
    if (isLocked !== null) params.isLocked = isLocked;
    if (isBought !== null) params.isBought = isBought;
    if (isUsed !== null) params.isUsed = isUsed;

    const response = await apiClient.get(
      VOUCHER_ITEM_ENDPOINTS.GET_BY_CAMPAIGN_ID,
      {
        params: params,
        paramsSerializer: {
          indexes: null,
        },
      }
    );

    if (!response.data) {
      console.warn(
        "API returned null/undefined data for campaignDetailIds:",
        campaignDetailIds
      );
      return {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
      };
    }

    // Format lại dữ liệu từ response
    const items = Array.isArray(response.data)
      ? response.data
      : response.data.items || [];
    const formattedItems = items.map((item) => ({
      id: item.id || "",
      voucherId: item.voucherId || "",
      campaignDetailId: item.campaignDetailId || "",
      code: item.voucherCode || "",
      name: item.voucher?.voucherName || "Voucher không tên",
      image: item.voucher?.image || "",
      price: item.voucher?.price || 0,
      rate: item.voucher?.rate || 0,
      isLocked: item.isLocked || false,
      isBought: item.isBought || false,
      isUsed: item.isUsed || false,
      validOn: item.validOn || null,
      expireOn: item.expireOn || null,
      createdAt: item.dateCreated || null,
      dateIssued: item.dateIssued || null,
      status: getVoucherItemStatus(item),
      studentName: item.student?.fullName || "",
      studentEmail: item.student?.email || "",
    }));


    const result = {
      items: formattedItems,
      total: Array.isArray(response.data)
          ? formattedItems.length
          : response.data.total || formattedItems.length,
      page: Array.isArray(response.data) ? page : response.data.page || page,
      totalPages: Array.isArray(response.data)
          ? Math.ceil(formattedItems.length / limit)
          : response.data.totalPages || Math.ceil(formattedItems.length / limit),
  };

    return result;
  } catch (error) {
    console.error("Error fetching voucher items:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    throw error;
  }
};

// Helper function to get voucher item status
function getVoucherItemStatus(item) {
  if (item.isUsed) return "Đã sử dụng";
  if (item.isBought) return "Đã mua";
  if (item.isLocked) return "Đã khóa";
  return "Khả dụng";
}
