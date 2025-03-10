import apiClient from "./apiClient";
import { VOUCHER_ENDPOINTS } from "./endpoints";

// API để tạo mới phiếu ưu đãi
export const createVoucherAPI = async (data) => {
  try {
    console.log("Creating voucher with data:", data);

    // Luôn sử dụng FormData vì Swagger yêu cầu multipart/form-data
    const formData = new FormData();
    
    // Append từng trường riêng biệt theo đúng yêu cầu của Swagger
    formData.append("brandId", data.brandId);
    formData.append("typeId", data.typeId);
    formData.append("voucherName", data.voucherName);
    formData.append("price", data.price);
    formData.append("rate", data.rate);
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("state", data.state);

    // Thêm ảnh nếu có
    if (data.image) {
      formData.append("image", data.image);
    }

    // Log để debug
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await apiClient.post(VOUCHER_ENDPOINTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    console.log("API Response:", response);

    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    console.error("Create voucher error details:", {
      error: error,
      response: error.response,
      data: error.response?.data,
      message: error.message,
      stack: error.stack
    });

    if (error.response?.data) {
      console.error("Server error response:", error.response.data);
    }

    throw {
      status: error.response?.status || 500,
      message: error.message || error.response?.data?.message || "Tạo phiếu ưu đãi thất bại",
      details: error.response?.data
    };
  }
};

// API lấy danh sách phiếu ưu đãi
export const getVouchersAPI = async ({
  page = 1,
  size = 10,
  search = "",
  state = true,
  isAsc = true,
  brandId = ""
}) => {
  try {
    if (!brandId) {
      console.warn("No brandId provided for fetching vouchers");
      return {
        status: 200,
        data: {
          size: size,
          page: page,
          total: 0,
          totalPages: 0,
          items: []
        }
      };
    }
    
    console.log("Fetching vouchers with params:", {
      page,
      size,
      search,
      state,
      isAsc,
      brandId
    });
    
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    params.append("brandId", brandId);
    
    // Chỉ thêm search nếu có giá trị
    if (search && search.trim() !== "") {
      params.append("search", search.trim());
    }

    // Luôn thêm state vì nó là boolean
    params.append("state", state.toString());
    
    // Luôn thêm isAsc vì nó là boolean
    params.append("isAsc", isAsc.toString());

    const url = `${VOUCHER_ENDPOINTS.GET_ALL}?${params}`;
    console.log(`Making request to: ${url}`);
    
    const response = await apiClient.get(url);
    console.log("Vouchers API raw response:", response.data);

    // Kiểm tra response data
    if (!response.data) {
      console.warn("No data received from API");
      return {
        status: response.status,
        data: {
          size,
          page,
          total: 0,
          totalPages: 0,
          items: []
        }
      };
    }

    // Trả về đúng format như API
    const responseData = {
      status: response.status,
      data: {
        size: response.data.size || size,
        page: response.data.page || page,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 0,
        items: Array.isArray(response.data.items) ? response.data.items.map(item => ({
          id: item.id,
          brandId: item.brandId,
          brandName: item.brandName,
          typeId: item.typeId,
          typeName: item.typeName,
          voucherName: item.voucherName,
          price: item.price,
          rate: item.rate,
          condition: item.condition,
          image: item.image,
          imageName: item.imageName,
          file: item.file || "Null",
          fileName: item.fileName || "Null",
          dateCreated: item.dateCreated,
          dateUpdated: item.dateUpdated,
          description: item.description,
          state: item.state,
          status: item.status,
          numberOfItems: item.numberOfItems || 0,
          numberOfItemsAvailable: item.numberOfItemsAvailable
        })) : []
      }
    };

    console.log("Processed response data:", responseData);
    return responseData;

  } catch (error) {
    console.error("Error fetching vouchers:", error);
    console.error("Error response:", error.response?.data);
    
    return {
      status: error.response?.status || 500,
      data: {
        size: size,
        page: page,
        total: 0,
        totalPages: 0,
        items: [],
        message: error.response?.data?.message || "Lấy danh sách phiếu ưu đãi thất bại"
      }
    };
  }
};

// API lấy chi tiết một phiếu ưu đãi theo ID
export const getVoucherByIdAPI = async (id) => {
  try {
    const response = await apiClient.get(
      VOUCHER_ENDPOINTS.GET_BY_ID.replace("{id}", id)
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: {
        message:
          error.response?.data?.message || "Lấy chi tiết phiếu ưu đãi thất bại",
      },
    };
  }
};