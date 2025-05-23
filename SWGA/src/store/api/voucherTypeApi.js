// store/api/voucherTypeApi.js
import apiClient from "./apiClient";
import { VOUCHER_TYPE_ENDPOINTS } from "./endpoints";
import toast from "react-hot-toast";

export const createVoucherTypeAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("typeName", data.typeName || "");
    formData.append("description", data.description || "");
    formData.append("state", data.state);

    if (data.image) {
      formData.append("image", data.image, data.image.name);
    }

    const response = await apiClient.post(VOUCHER_TYPE_ENDPOINTS.CREATE, formData, {
      headers: {
        Accept: "text/plain",
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Invalid server response");
    }

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Voucher type API error:", error);
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Tạo loại ưu đãi thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const updateVoucherTypeAPI = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("typeName", data.typeName || "");
    formData.append("description", data.description || "");
    formData.append("state", data.state);

    if (data.image) {
      if (data.image instanceof File) {
        // Nếu là file (từ input type="file")
        formData.append("image", data.image, data.image.name);
      } else {
        // Nếu là chuỗi (URL)
        formData.append("image", data.image);
      }
    }

    const response = await apiClient.put(
      VOUCHER_TYPE_ENDPOINTS.UPDATE.replace("{id}", id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      toast.error("Cập nhật loại ưu đãi thất bại!");
      throw new Error("Invalid server response");
    }

    // toast.success("Cập nhật loại ưu đãi thành công!");
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Update voucher type API error:", error);
    toast.error(error.message || "Đã có lỗi xảy ra khi cập nhật loại ưu đãi!");
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Cập nhật loại ưu đãi thất bại",
      details: error.response?.data || error.message,
    };
  }
};
export const getVoucherTypesAPI = async ({
  page = 1,
  size = 10,
  search = "",
  state = true,
  isAsc = true,
} = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    if (search && search.trim() !== "") {
      params.append("search", search.trim());
    }
    params.append("state", state.toString());
    params.append("isAsc", isAsc.toString());

    const url = `${VOUCHER_TYPE_ENDPOINTS.GET_ALL}?${params}`;
    
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
              description: type.description || "",
              state: type.state ?? true,
            }))
          : [],
      },
    };

    return responseData;
  } catch (error) {
    console.error("Error in getVoucherTypesAPI:", error);
    toast.error(error.message || "Đã có lỗi xảy ra khi lấy danh sách loại ưu đãi!");
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Lấy danh sách loại ưu đãi thất bại",
      details: error.response?.data || error.message,
    };
  }
};