import apiClient from "./apiClient";
import { CAMPUS } from "./endpoints";
import toast from "react-hot-toast";

// 1. Lấy danh sách tất cả campus
export const getAllCampusesAPI = async ({ searchName = "", page = 1, size = 10 } = {}) => {
  try {
    const response = await apiClient.get(CAMPUS.GET_ALL, {
      params: { searchName, page, size },
    });
    console.log("API Response:", response.data); // Kiểm tra dữ liệu từ server
    if (response.data) {
      return { status: response.status, success: true, data: response.data };
    } else {
      return { status: response.status, success: false, message: "Không nhận được dữ liệu từ server!" };
    }
  } catch (error) {
    console.error("Get All Campuses API Error:", error);
    const errorMessage = error.response?.data?.message || "Lấy danh sách campus thất bại";
    return { status: error.response?.status || 500, success: false, message: errorMessage };
  }
};
// 2. Lấy thông tin campus theo ID
export const getCampusByIdAPI = async (id) => {
  try {
    const response = await apiClient.get(
      CAMPUS.GET_BY_ID.replace("{id}", id)
    );

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
    console.error("Get Campus By ID API Error:", error);
    const errorMessage =
      error.response?.data?.message || "Lấy thông tin campus thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};

// 3. Tạo mới campus
export const createCampusAPI = async (formData) => {
  try {
    // Format the campus data to ensure consistency
    const formatCampusData = (formData) => {
      return {
        areaId: formData.areaId?.trim() || "", // Sửa từ "areald" thành "areaId"
        campusName: formData.campusName?.trim() || "",
        address: formData.address || "",
        phone: formData.phone || "",
        email: formData.email || "",
        link: formData.link || "",
        description: formData.description || "",
        state: formData.state !== undefined ? formData.state : true,
      };
    };

    const campusData = formatCampusData(formData);

    // Prepare FormData for the request body
    const apiFormData = new FormData();
    apiFormData.append("areaId", campusData.areaId);
    apiFormData.append("campusName", campusData.campusName);
    apiFormData.append("address", campusData.address);
    apiFormData.append("phone", campusData.phone);
    apiFormData.append("email", campusData.email);
    apiFormData.append("link", campusData.link);
    apiFormData.append("description", campusData.description);
    apiFormData.append("state", campusData.state.toString());

    if (formData.image instanceof File) {
      apiFormData.append("image", formData.image);
    } else if (formData.image && typeof formData.image === "string") {
      console.warn("Image is a string, skipping file upload:", formData.image);
    }

    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let [key, value] of apiFormData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Gửi POST request chỉ với URL gốc (không có query parameters)
    const response = await apiClient.post(CAMPUS.CREATE, apiFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "text/plain",
      },
    });

    if (response.data) {
      toast.success("Tạo campus thành công!");
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      toast.error("Tạo campus thất bại!");
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error("Create Campus API Error:", error.response?.data || error);
    const errorMessage =
      error.response?.data?.message || "Tạo campus thất bại";
    toast.error(errorMessage);
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};


// 4. Cập nhật thông tin campus
export const updateCampusAPI = async (id, formData) => {
  try {
    // Format dữ liệu campus
    const formatCampusData = (formData) => {
      return {
        areaId: formData.areaId?.trim() || "",
        campusName: formData.campusName?.trim() || "",
        address: formData.address || "",
        phone: formData.phone || "",
        email: formData.email || "",
        link: formData.link || "",
        description: formData.description || "",
        state: formData.state !== undefined ? formData.state : true,
      };
    };

    const campusData = formatCampusData(formData);

    // Tạo FormData để gửi cả dữ liệu và image
    const apiFormData = new FormData();
    apiFormData.append("areaId", campusData.areaId);
    apiFormData.append("campusName", campusData.campusName);
    apiFormData.append("address", campusData.address);
    apiFormData.append("phone", campusData.phone);
    apiFormData.append("email", campusData.email);
    apiFormData.append("link", campusData.link);
    apiFormData.append("description", campusData.description);
    apiFormData.append("state", campusData.state.toString());

    // Thêm image nếu có
    if (formData.image instanceof File) {
      apiFormData.append("image", formData.image);
    } else if (formData.image && typeof formData.image === "string") {
      console.warn("Image is a string, skipping file upload:", formData.image);
    }

    // Log dữ liệu để debug
    console.log("Sending data to API:");
    for (let [key, value] of apiFormData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Gửi yêu cầu PUT với body là FormData
    const url = CAMPUS.UPDATE.replace("{id}", id); // Chỉ gửi id trong URL
    const response = await apiClient.put(url, apiFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data) {
      toast.success("Cập nhật campus thành công!");
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      toast.error("Cập nhật campus thất bại!");
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error("Update Campus API Error:", error.response?.data || error);
    const errorMessage =
      error.response?.data?.message || "Cập nhật campus thất bại";
    toast.error(errorMessage);
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};
export const getCampusByAccountIdAPI = async (accountId) => {
  try {
    const response = await apiClient.get(
      CAMPUS.GET_BY_ID_ACCOUNT.replace("{id}", accountId)
    );

    if (response.data) {
      console.log("getCampusByAccountIdAPI - Response:", response.data); // Debug
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
    console.error("Get Campus By Account ID API Error:", error);
    const errorMessage =
      error.response?.data?.message || "Lấy thông tin campus theo account thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};