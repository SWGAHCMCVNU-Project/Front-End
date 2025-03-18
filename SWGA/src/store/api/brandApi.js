// store/api/brandApi.js
import apiClient from './apiClient';
import { BRAND_ENDPOINTS } from './endpoints';
import StorageService from '../../services/storageService';
import toast from 'react-hot-toast';

export const getBrandByAccountIdAPI = async () => {
  try {
    const accountId = StorageService.getAccountId();
    if (!accountId) {
      return null;
    }

    const allBrandsResponse = await getAllBrandsAPI({});
    if (allBrandsResponse.status === 200) {
      const brands = Array.isArray(allBrandsResponse.data.items) ? allBrandsResponse.data.items : [];
      const foundBrand = brands.find(brand => brand.accountId === accountId);

      if (foundBrand) {
        StorageService.setBrandId(foundBrand.id);
        return foundBrand;
      }
    }

    const savedBrandId = StorageService.getBrandId();
    if (savedBrandId) {
      try {
        const brandResponse = await getBrandByIdAPI(savedBrandId);
        if (brandResponse.status === 200) {
          return brandResponse.data;
        }
      } catch (error) {
        // Không cần log lỗi ở đây, chỉ xử lý silently
      }
    }

    return null;
  } catch (error) {
    toast.error(error.message || "Đã có lỗi xảy ra khi lấy thông tin thương hiệu!");
    return null;
  }
};

export const getBrandByIdAPI = async (brandId) => {
  try {
    const response = await apiClient.get(BRAND_ENDPOINTS.GET_BY_ID.replace("{id}", brandId));
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    toast.error(error.message || "Đã có lỗi xảy ra khi lấy thông tin thương hiệu!");
    throw error;
  }
};

export const getAllBrandsAPI = async ({ page = 1, size = 10, search = "", state = true, isAsc = true } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    if (search && search.trim() !== "") params.append("searchName", search.trim());
    params.append("state", state.toString());
    params.append("isAsc", isAsc.toString());

    const url = `${BRAND_ENDPOINTS.GET_ALL}?${params.toString()}`;
    const response = await apiClient.get(url);

    if (!response.data) {
      return {
        status: response.status,
        data: { size, page, total: 0, totalPages: 0, items: [] },
      };
    }

    return {
      status: response.status,
      data: {
        size: response.data.pageSize || size,
        page: response.data.pageNumber || page,
        total: response.data.total || response.data.items?.length || 0,
        totalPages: response.data.totalPages || 0,
        items: Array.isArray(response.data.items) ? response.data.items : [],
      },
    };
  } catch (error) {
    toast.error(error.message || "Đã có lỗi xảy ra khi lấy danh sách thương hiệu!");
    throw error;
  }
};

export const updateBrandAPI = async (brandId, brandData) => {
  if (!brandId || brandId === "undefined") {
    throw new Error("Brand ID is missing or invalid!");
  }

  try {
    const formData = new FormData();
    for (const key in brandData) {
      if (brandData[key] instanceof File) {
        formData.append(key, brandData[key]);
      } else if (brandData[key] !== undefined && brandData[key] !== null) {
        // Nếu là object (như openingHours, closingHours), gửi dưới dạng JSON string
        if (typeof brandData[key] === "object") {
          formData.append(key, JSON.stringify(brandData[key]));
        } else {
          formData.append(key, brandData[key]);
        }
      }
    }

    const response = await apiClient.put(
      BRAND_ENDPOINTS.UPDATE.replace("{id}", brandId),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return { status: response.status, data: response.data };
  } catch (error) {
    toast.error(error.message || "Đã có lỗi xảy ra khi cập nhật thương hiệu!");
    throw error;
  }
};