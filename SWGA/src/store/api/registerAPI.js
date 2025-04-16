// store/api/registerApi.js
import apiClient from "./apiClient";
import { ACCOUNT_ENDPOINTS } from "./endpoints";
import toast from "react-hot-toast";
import StorageService from "../../services/storageService";

export const registerBrandAPI = async (formData, coverPhoto, logo) => {
  try {
    // Định dạng dữ liệu từ UI trước khi gửi lên server
    const formatBrandData = (formData, coverPhoto, logo) => {
      const [openingHours, openingMinutes] = formData.openingHours.split(":");
      const [closingHours, closingMinutes] = formData.closingHours.split(":");

      return {
        userName: formData.userName,
        password: formData.password,
        phone: formData.phone,
        email: formData.email,
        brandName: formData.brandName,
        acronym: formData.acronym || "",
        address: formData.address,
        logo: logo,
        coverPhoto: coverPhoto,
        link: formData.link || "",
        openingHours: `${openingHours.padStart(2, "0")}:${openingMinutes.padStart(2, "0")}:00`,
        closingHours: `${closingHours.padStart(2, "0")}:${closingMinutes.padStart(2, "0")}:00`,
        description: formData.description || "",
        state: true,
      };
    };

    // Format dữ liệu từ UI
    const brandData = formatBrandData(formData, coverPhoto, logo);

    // Tạo FormData object
    const apiFormData = new FormData();
    apiFormData.append("userName", brandData.userName);
    apiFormData.append("password", brandData.password);
    apiFormData.append("phone", brandData.phone);
    apiFormData.append("email", brandData.email);
    apiFormData.append("brandName", brandData.brandName);
    apiFormData.append("acronym", brandData.acronym || "");
    apiFormData.append("address", brandData.address);

    if (brandData.coverPhoto) {
      const base64Response = await fetch(brandData.coverPhoto);
      const blob = await base64Response.blob();
      apiFormData.append("coverPhoto", blob, "cover.jpg");
    }
    if (brandData.logo) {
      const base64Response = await fetch(brandData.logo);
      const blob = await base64Response.blob();
      apiFormData.append("logo", blob, "logo.jpg");
    }
    apiFormData.append("link", brandData.link || "");
    apiFormData.append("openingHours", brandData.openingHours);
    apiFormData.append("closingHours", brandData.closingHours);
    apiFormData.append("description", brandData.description || "");
    apiFormData.append("state", brandData.state);

    // Gửi yêu cầu lên server
    const response = await apiClient.post(
      ACCOUNT_ENDPOINTS.RegisterBrand,
      apiFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Xử lý phản hồi từ API
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
    const errorMessage = error.response?.data?.Message || "Đăng ký thất bại";

    // Kiểm tra nếu lỗi là do userName trùng
    if (error.response?.data?.Message === "Account already exists") {
      return {
        status: error.response?.status || 409,
        success: false,
        message: "Tên tài khoản đã tồn tại!",
      };
    }

    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};
export const registerStore = async (formData) => {
  try {
    const brandId = StorageService.getBrandId();
    const [openH, openM] = formData.openingHours.split(":");
    const [closeH, closeM] = formData.closingHours.split(":");
    const syncedEmail = formData.email || "";
    const storeData = {
      brandId: brandId || formData.brandId || "",
      areaId: formData.areaId || "",
      storeName: formData.storeName || "",
      phone: formData.phone || "",
      email: syncedEmail || "",
      address: formData.address || "",
      openingHours: `${openH.padStart(2, "0")}:${openM.padStart(2, "0")}:00`,
      closingHours: `${closeH.padStart(2, "0")}:${closeM.padStart(2, "0")}:00`,
      description: formData.description || "",
      state: formData.state ?? true,
      userName: formData.userName || "",
      password: formData.password || "",
      avatar: formData.avatar,
    };

    const data = new FormData();
    data.append("userName", storeData.userName);
    data.append("password", storeData.password);
    data.append("phone", storeData.phone);
    data.append("email", syncedEmail);

    if (storeData.avatar) {
      const avatarFile =
        storeData.avatar instanceof FileList
          ? storeData.avatar[0]
          : storeData.avatar;
      if (avatarFile instanceof File) {
        data.append("avatar", avatarFile, avatarFile.name);
      }
    }

    const queryParams = new URLSearchParams({
      brandId: storeData.brandId,
      areaId: storeData.areaId,
      storeName: storeData.storeName,
      address: formData.address || "",
      openingHours: storeData.openingHours,
      closingHours: storeData.closingHours,
      description: storeData.description,
      state: storeData.state,
    }).toString();

    const response = await apiClient.post(
      `${ACCOUNT_ENDPOINTS.RegisterStore}?${queryParams}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.data) {
      return { status: response.status, success: true, data: response.data };
    }
    return {
      status: response.status,
      success: false,
      message: "No data from server!",
    };
  } catch (error) {
    const errorMessage = error.response?.data?.Message || "Lỗi đăng ký store"; // Sửa "message" thành "Message"
    if (error.response?.data?.Message === "Account already exists") { // Sửa "message" thành "Message"
      return {
        status: error.response?.status || 409,
        success: false,
        message: "Tên tài khoản đã tồn tại!",
      };
    }
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};
// store/api/registerApi.js (updated getAccountByIdAPI)

export const getAccountByIdAPI = async (id) => {
  try {
    const accountId = id || StorageService.getAccountId();
    if (!accountId) {
      console.error("Account ID is missing!");
      return {
        status: 400,
        success: false,
        message: "Account ID is required!",
      };
    }


    const response = await apiClient.get(
      ACCOUNT_ENDPOINTS.AccountDetail.replace("{id}", accountId)
    );

    if (response.data) {
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } else {
      console.warn("No data received from server for account ID:", accountId);
      return {
        status: response.status,
        success: false,
        message: "Không nhận được dữ liệu từ server!",
      };
    }
  } catch (error) {
    console.error(
      "Get Account By ID API Error:",
      error.response?.data || error
    );
    const errorMessage =
      error.response?.data?.message || "Lấy thông tin tài khoản thất bại";
    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};

export const updateAccountIdAPI = async (id, oldPassword, updatedData) => {
  try {
    const accountId = id || StorageService.getAccountId();
    if (!accountId) throw new Error("Account ID is required!");

    // Xây dựng query params (chỉ thêm nếu có giá trị)
    const queryParams = new URLSearchParams();
    if (oldPassword) queryParams.append("oldPassword", oldPassword);
    if (updatedData.phone) queryParams.append("phone", updatedData.phone);
    if (updatedData.email) queryParams.append("email", updatedData.email);
    if (updatedData.password)
      queryParams.append("newPassword", updatedData.password);

    

    const response = await apiClient.put(
      `${ACCOUNT_ENDPOINTS.UPDATEACCOUNT.replace(
        "{id}",
        accountId
      )}?${queryParams.toString()}`,
      {}, // Không cần body vì tất cả dữ liệu đã nằm trong query params
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response indicates success
    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data || {} };
    } else {
      throw new Error("Failed to update account");
    }
  } catch (error) {
    console.error(
      "❌ Update Account API Error:",
      error.response?.data || error.message
    );
    toast.error(
      error.response?.data?.message || "Cập nhật tài khoản thất bại!"
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const registerCampusAPI = async (formData, campusId) => {
  try {
    const campusData = {
      userName: formData.userName || "",
      password: formData.password || "",
      phone: formData.phone || "",
      email: formData.email || "",
    };

    const data = new FormData();
    data.append("userName", campusData.userName);
    data.append("password", campusData.password);
    data.append("phone", campusData.phone);
    data.append("email", campusData.email);

    const queryParams = new URLSearchParams({
      campusId: campusId || "",
    }).toString();

    const response = await apiClient.post(
      `${ACCOUNT_ENDPOINTS.RegisterCampus}?${queryParams}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.data) {
      return { status: response.status, success: true, data: response.data };
    }
    return {
      status: response.status,
      success: false,
      message: "Không nhận được dữ liệu từ server!",
    };
  } catch (error) {
    const errorMessage = error.response?.data?.Message || "Lỗi đăng ký tài khoản campus"; // Sửa "message" thành "Message"

    // Kiểm tra nếu lỗi là do trùng userName
    if (error.response?.data?.Message === "Account already exists") { // Sửa điều kiện kiểm tra
      return {
        status: error.response?.status || 409,
        success: false,
        message: "Tên tài khoản đã tồn tại!",
      };
    }

    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};
export const registerLecturerAPI = async (formData, campusId) => {
  try {
    const lecturerData = {
      userName: formData.userName || "",
      password: formData.password || "",
      phone: formData.phone || "",
      email: formData.email || "",
      fullName: formData.fullName || "",
    };

    const data = new FormData();
    data.append("userName", lecturerData.userName);
    data.append("password", lecturerData.password);
    data.append("phone", lecturerData.phone);
    data.append("email", lecturerData.email);
    data.append("fullName", lecturerData.fullName);
    // Add campusId to FormData instead of query parameters
    data.append("campusId", campusId || "");

    // Log the FormData contents
   

    const url = ACCOUNT_ENDPOINTS.RegisterLecturer; // No query parameters

    const response = await apiClient.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data) {
      return { status: response.status, success: true, data: response.data };
    }
    return {
      status: response.status,
      success: false,
      message: "Không nhận được dữ liệu từ server!",
    };
  } catch (error) {
    const errorMessage = error.response?.data?.Message || "Lỗi đăng ký tài khoản lecturer";

    if (error.response?.data?.Message === "Account already exists") {
      return {
        status: error.response?.status || 409,
        success: false,
        message: "Tên tài khoản đã tồn tại!",
      };
    }

    return {
      status: error.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};