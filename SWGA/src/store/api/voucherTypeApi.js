import apiClient from "./apiClient";
import { VOUCHER_TYPE_ENDPOINTS } from "./endpoints";

export const createVoucherTypeAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("typeName", data.typeName || "");
    formData.append("description", data.description || "");
    formData.append("state", true);

    if (data.image) {
      formData.append("image", data.image, data.image.name);
    }

    const response = await apiClient.post(VOUCHER_TYPE_ENDPOINTS.CREATE, formData, {
      headers: { Accept: "text/plain" },
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Invalid server response");
    }

    return { status: response.status, data: response.data };
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Tạo loại ưu đãi thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const getVoucherTypesAPI = async () => {
  try {
    console.log('Calling getVoucherTypesAPI');
    const response = await apiClient.get(VOUCHER_TYPE_ENDPOINTS.GET_ALL);
    console.log('API Response:', response);

    // Kiểm tra response có data không
    if (!response.data) {
      console.log('No data in response');
      return { status: response.status, data: [] };
    }

    // Nếu response.data là array
    if (Array.isArray(response.data)) {
      console.log('Response data is array:', response.data);
      const transformedData = response.data.map((type) => ({
        id: type.id || "",
        typeName: type.typeName || "",
        image: type.image || "",
        description: type.description || "",
        state: type.state ?? true,
      }));
      console.log('Transformed data:', transformedData);
      return { status: response.status, data: transformedData };
    }

    // Nếu response.data không phải array
    console.log('Response data is not array, checking for items property');
    const items = response.data.items || [];
    const transformedData = items.map((type) => ({
      id: type.id || "",
      typeName: type.typeName || "",
      image: type.image || "",
      description: type.description || "",
      state: type.state ?? true,
    }));
    console.log('Transformed data from items:', transformedData);
    return { status: response.status, data: transformedData };
  } catch (error) {
    console.error('Error in getVoucherTypesAPI:', error);
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Lấy danh sách loại ưu đãi thất bại",
      details: error.response?.data || error.message,
    };
  }
};