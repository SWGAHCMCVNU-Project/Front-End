// store/api/storeApi.js
import apiClient from "./apiClient";
import { STORE_ENDPOINTS } from "./endpoints";
import toast from "react-hot-toast";

// 1. Lấy danh sách tất cả cửa hàng

export const getAllStoresAPI = async ({
  searchName = "",
  page = 1,
  size = 10,
  // brandID // Thêm brandID vào tham số
} = {}) => {
  try {
    const response = await apiClient.get(STORE_ENDPOINTS.GET_ALL, {
      params: {
        searchName,
        page,
        size,
        // ...(brandID && { brandID }) // Thêm brandID vào params nếu có
      },
    });

    if (response.data) {
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error("Get All Stores API Error:", error);
    const errorMessage =
      error.response?.data?.message || "Lấy danh sách cửa hàng thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};
// 2. Lấy thông tin cửa hàng theo ID
export const getStoreByIdAPI = async (id) => {
  try {
    const response = await apiClient.get(
      STORE_ENDPOINTS.GET_BY_ID.replace("{id}", id) // Giả định sửa thành /Store/{id} nếu cần
    );

    if (response.data) {
      return {
        status: response.status,
        success: true,
        data: response.data, // Thông tin cửa hàng: { id, storeName, phone, email, address, ... }
      };
    } else {
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error("Get Store By ID API Error:", error);
    const errorMessage =
      error.response?.data?.message || "Lấy thông tin cửa hàng thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};

// 3. Cập nhật thông tin cửa hàng
export const updateStoreAPI = async (id, formData) => {
  try {
    // Format the store data to ensure consistency
    const formatStoreData = (formData) => {
      // Convert openingHours and closingHours to "HH:MM" format or split into hour/minute
      const openingHoursStr = formData.openingHours
        ? `${String(
            formData.openingHours.hour || formData.openingHours.split(":")[0]
          ).padStart(2, "0")}:${String(
            formData.openingHours.minute || formData.openingHours.split(":")[1]
          ).padStart(2, "0")}`
        : "";
      const closingHoursStr = formData.closingHours
        ? `${String(
            formData.closingHours.hour || formData.closingHours.split(":")[0]
          ).padStart(2, "0")}:${String(
            formData.closingHours.minute || formData.closingHours.split(":")[1]
          ).padStart(2, "0")}`
        : "";

      return {
        brandId: formData.brandId || "",
        areaId: formData.areaId?.trim() || "", // Remove trailing spaces
        storeName: formData.storeName || "",
        phone: formData.phone || "",
        email: formData.email || "",
        address: formData.address || "",
        openingHours: openingHoursStr,
        closingHours: closingHoursStr,
        description: formData.description || "",
        state: formData.state !== undefined ? formData.state : true,
      };
    };

    const storeData = formatStoreData(formData);

    // Separate data into query parameters
    const queryParams = new URLSearchParams({
      brandId: storeData.brandId,
      areaId: storeData.areaId,
      storeName: storeData.storeName,
      phone: storeData.phone,
      email: storeData.email,
      address: storeData.address,
      openingHours: storeData.openingHours,
      closingHours: storeData.closingHours,
      description: storeData.description,
      state: storeData.state.toString(),
    });

    // Prepare FormData for the request body
    const apiFormData = new FormData();
    // Add fields to the body that are similar to registerStore (e.g., avatar)
    if (formData.avatar instanceof File) {
      apiFormData.append("avatar", formData.avatar);
    } else if (formData.avatar && typeof formData.avatar === "string") {
      // If avatar is a URL or base64, you might need to handle it differently
      console.warn(
        "Avatar is a string, skipping file upload:",
        formData.avatar
      );
    }

    // Log the query parameters and FormData for debugging
    console.log("Query Params:", queryParams.toString());
    console.log("FormData contents:");
    for (let [key, value] of apiFormData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Send the PUT request with query parameters and FormData body
    const url = `${STORE_ENDPOINTS.UPDATE.replace(
      "{id}",
      id
    )}?${queryParams.toString()}`;
    const response = await apiClient.put(url, apiFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "text/plain", // Match the Accept header from registerStore
      },
    });

    if (response.data) {
      // toast.success("Cập nhật cửa hàng thành công!");
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      toast.error("Cập nhật cửa hàng thất bại!");
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error("Update Store API Error:", error.response?.data || error);
    const errorMessage =
      error.response?.data?.message || "Cập nhật cửa hàng thất bại";
    toast.error(errorMessage);
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};
export const getStoresByBrandIdAPI = async (brandId, { page = 1, size = 10, searchName = "" } = {}) => {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required");
    }

    const url = STORE_ENDPOINTS.GET_STORE_BY_ID.replace("{id}", brandId);
    const response = await apiClient.get(url, {
      params: {
        page,
        size,
        searchName,
      },
    });

    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(`Error fetching stores for brand ${brandId}:`, error);
    const errorMessage =
      error.response?.data?.message || "Lấy danh sách cửa hàng theo thương hiệu thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};