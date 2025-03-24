import apiClient from "./apiClient";
import { POINT_PACKAGE } from "./endpoints";
import { toast } from "react-hot-toast";

export const getAllPointPackages = async ({
  page = 1,
  size = 10,
  searchName = "",
  status = true,
  isAsc = true,
} = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    if (searchName && searchName.trim() !== "") {
      params.append("searchName", searchName.trim());
    }
    if (status !== null) {
      params.append("status", status.toString());
    }
    params.append("isAsc", isAsc.toString());

    const url = `${POINT_PACKAGE.GET_ALL}?${params}`;
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
          ? response.data.items.map((pkg) => ({
              id: pkg.id || "",
              packageName: pkg.packageName || "",
              point: pkg.point || 0,
              price: pkg.price || 0,
              dateCreated: pkg.dateCreated || "",
              dateUpdated: pkg.dateUpdated || "",
              status: pkg.status ?? true,
            }))
          : [],
      },
    };

    return responseData;
  } catch (error) {
    console.error("Error in getAllPointPackages:", error);
    toast.error(
      error.message || "Đã có lỗi xảy ra khi lấy danh sách gói điểm!"
    );
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Lấy danh sách gói điểm thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const getPointPackageById = async (id) => {
  try {
    const response = await apiClient.get(
      POINT_PACKAGE.GET_BY_ID.replace("{id}", id)
    );

    if (response.status < 200 || response.status >= 300) {
      toast.error("Lấy thông tin gói điểm thất bại!");
      throw new Error("Invalid server response");
    }

    const responseData = {
      status: response.status,
      data: {
        id: response.data.id || "",
        packageName: response.data.packageName || "",
        point: response.data.point || 0,
        price: response.data.price || 0,
        dateCreated: response.data.dateCreated || "",
        dateUpdated: response.data.dateUpdated || "",
        status: response.data.status ?? true,
      },
    };

    return responseData;
  } catch (error) {
    console.error("Error in getPointPackageById:", error);
    toast.error(
      error.message || "Đã có lỗi xảy ra khi lấy thông tin gói điểm!"
    );
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Lấy thông tin gói điểm thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const createPointPackage = async ({
  packageName,
  point,
  price,
  status = true,
}) => {
  try {
    const response = await apiClient.post(POINT_PACKAGE.CREATE, {
      packageName,
      point,
      price,
      status,
    });

    if (response.status < 200 || response.status >= 300) {
      toast.error("Tạo gói điểm thất bại!");
      throw new Error("Invalid server response");
    }

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Point package API error:", error);
    toast.error(error.message || "Đã có lỗi xảy ra khi tạo gói điểm!");
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Tạo gói điểm thất bại",
      details: error.response?.data || error.message,
    };
  }
};

export const updatePointPackage = async (
  id,
  { packageName, point, price, status }
) => {
  try {
    const response = await apiClient.put(
      POINT_PACKAGE.UPDATE.replace("{id}", id),
      {
        packageName,
        point,
        price,
        status,
      }
    );

    if (response.status < 200 || response.status >= 300) {
      toast.error("Cập nhật gói điểm thất bại!");
      throw new Error("Invalid server response");
    }

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Update point package API error:", error);
    toast.error(
      error.message || "Đã có lỗi xảy ra khi cập nhật gói điểm!"
    );
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Cập nhật gói điểm thất bại",
      details: error.response?.data || error.message,
    };
  }
};
