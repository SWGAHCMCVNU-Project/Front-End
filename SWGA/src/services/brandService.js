import apiClient from '../store/api/apiClient';
import { BRAND_ENDPOINTS } from '../store/api/endpoints';
import storageService from './storageService';
import toast from 'react-hot-toast';

class BrandService {
  async getBrandByAccountId() {
    try {
      const accountId = storageService.getAccountId();
      
      if (!accountId) {
        throw new Error("Không tìm thấy thông tin tài khoản");
      }
      
      const allBrandsResponse = await this.getAllBrands({});
      
      if (allBrandsResponse.status === 200) {
        const brands = Array.isArray(allBrandsResponse.data.items) 
          ? allBrandsResponse.data.items
          : [];
        
        const foundBrand = brands.find(brand => brand.accountId === accountId);
        
        if (foundBrand) {
          storageService.setBrandId(foundBrand.id);
          return foundBrand;
        }
      }
      
      const savedBrandId = storageService.getBrandId();
      if (savedBrandId) {
        try {
          const brandResponse = await this.getBrandById(savedBrandId);
          if (brandResponse.status === 200) {
            return brandResponse.data;
          }
        } catch (error) {
          console.warn("Failed to get brand with saved brandId:", error);
        }
      }
      
      throw new Error("Không tìm thấy thông tin thương hiệu");
    } catch (error) {
      toast.error(error.message || "Đã có lỗi xảy ra khi lấy thông tin thương hiệu!");
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Lấy thông tin thương hiệu thất bại",
        details: error.message
      };
    }
  }
  
  async getBrandById(brandId) {
    try {
      const response = await apiClient.get(BRAND_ENDPOINTS.GET_BY_ID.replace("{id}", brandId));
      
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      toast.error(error.message || "Đã có lỗi xảy ra khi lấy thông tin thương hiệu!");
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Lấy thông tin thương hiệu thất bại",
        details: error.response?.data || error.message
      };
    }
  }
  
  async getAllBrands({
    page = 1,
    size = 10,
    search = "",
    state = true,
    isAsc = true,
  } = {}) {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("size", size);

      if (search && search.trim() !== "") {
        params.append("searchName", search.trim());
      }

      params.append("state", state.toString());
      params.append("isAsc", isAsc.toString());

      const url = `${BRAND_ENDPOINTS.GET_ALL}?${params.toString()}`;

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
      toast.error(
        error.message || "Đã có lỗi xảy ra khi lấy danh sách thương hiệu!"
      );
      throw {
        status: error.response?.status || 500,
        message:
          error.response?.data?.message || "Lấy danh sách thương hiệu thất bại",
        details: error.response?.data || error.message,
      };
    }
  }
  
  async updateBrand(brandId, brandData) {
    try {
      const formData = new FormData();
      for (const key in brandData) {
        if (brandData[key] instanceof File) {
          formData.append(key, brandData[key]);
        } else if (brandData[key] !== undefined && brandData[key] !== null) {
          formData.append(key, brandData[key]);
        }
      }

      const response = await apiClient.put(
        BRAND_ENDPOINTS.UPDATE.replace("{id}", brandId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Đã có lỗi xảy ra khi cập nhật thương hiệu!"
      );
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Cập nhật thương hiệu thất bại",
        details: error.response?.data || error.message,
      };
    }
  }
}

export default new BrandService();