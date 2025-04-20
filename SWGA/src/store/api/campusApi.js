import apiClient from "./apiClient";
import { CAMPUS } from "./endpoints";
import toast from "react-hot-toast";
import StorageService from "../../services/storageService";

// 1. Lấy danh sách tất cả campus
export const getAllCampusesAPI = async ({ searchName = "", page = 1, size = 10 } = {}) => {
  try {
    const response = await apiClient.get(CAMPUS.GET_ALL, {
      params: { searchName, page, size },
    });
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

    const url = CAMPUS.UPDATE.replace("{id}", id);
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

// 5. Lấy campus theo accountId (sửa để nhận accountId làm tham số)
export const getCampusByAccountIdAPI = async (accountId) => {
  const role = StorageService.getRoleLogin();
  if (role !== "campus") {
    return { success: false, message: "Vai trò không phải campus" };
  }

  try {
    if (!accountId) {
      return { success: false, message: "Không có accountId" };
    }

    const response = await apiClient.get(
      CAMPUS.GET_BY_ID_ACCOUNT.replace("{id}", accountId)
    );

    if (response.status === 200 && response.data) {
      let campusId;
      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          console.warn('No campus data found for accountId:', accountId);
          return { success: false, message: "Không tìm thấy campus" };
        }
        campusId = response.data[0]?.id;
      } else if (response.data?.id) {
        campusId = response.data.id;
      } else if (response.data?.data?.id) {
        campusId = response.data.data.id;
      }

      if (campusId) {
        return { success: true, data: response.data };
      }

      console.warn('No campusId found in response:', response.data);
      return { success: false, message: "Không tìm thấy campusId trong dữ liệu trả về" };
    }

    return { success: false, message: "Không nhận được dữ liệu từ server" };
  } catch (error) {
    console.error('Error fetching campus by accountId:', error);
    return { success: false, message: error.message || "Đã có lỗi xảy ra khi lấy thông tin campus" };
  }
};

// 6. Phân bổ điểm
export const distributePointsAPI = async (campusId, lecturerIds, points) => {
  try {
    const response = await apiClient.post(
      `${CAMPUS.DISTRIBUTE_POINT}?${new URLSearchParams({
        campusId,
        lecturerIds: lecturerIds.join(","),
        points
      }).toString()}`,
      null,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data);
    throw new Error(error.response?.data?.Message || "Phân bổ điểm thất bại");
  }
};