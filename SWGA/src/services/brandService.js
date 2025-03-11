import apiClient from '../store/api/apiClient';
import { BRAND_ENDPOINTS } from '../store/api/endpoints';
import storageService from './storageService';
import toast from 'react-hot-toast';

class BrandService {
  async getBrandByAccountId() {
    try {
      // Lấy accountId từ user để tìm brand
      const accountId = storageService.getAccountId();
      console.log("Finding brand using accountId:", accountId);
      
      if (!accountId) {
        throw new Error("Không tìm thấy thông tin tài khoản");
      }
      
      // Lấy tất cả brands và tìm theo accountId
      const allBrandsResponse = await this.getAllBrands({});
      
      if (allBrandsResponse.status === 200) {
        const brands = Array.isArray(allBrandsResponse.data.items) 
          ? allBrandsResponse.data.items
          : [];
        
        // Tìm brand có accountId trùng khớp
        const foundBrand = brands.find(brand => brand.accountId === accountId);
        
        if (foundBrand) {
          console.log("Found brand:", {
            brandId: foundBrand.id,
            accountId: foundBrand.accountId,
            brandName: foundBrand.brandName
          });
          
          // Lưu brandId (không phải accountId) vào localStorage
          storageService.setBrandId(foundBrand.id);
          return foundBrand;
        }
      }
      
      // Nếu không tìm thấy qua accountId, thử lấy từ brandId đã lưu
      const savedBrandId = storageService.getBrandId();
      if (savedBrandId) {
        try {
          console.log("Attempting to get brand using saved brandId:", savedBrandId);
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
      console.error("Error in getBrandByAccountId:", error);
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
      console.log("Fetching brand with ID:", brandId);
      const response = await apiClient.get(BRAND_ENDPOINTS.GET_BY_ID.replace("{id}", brandId));
      
      console.log("Brand API response:", response);
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      console.error("Error fetching brand by ID:", error);
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
      console.log("Fetching brands with params:", {
        page, 
        search,
        state,
        isAsc,
      });
  
      const params = new URLSearchParams();
      params.append("page", page); // Đảm bảo đúng key là `page`
      params.append("size", size); // Đảm bảo đúng key là `size`
  
      // Sử dụng `searchName` thay vì `search`
      if (search && search.trim() !== "") {
        params.append("searchName", search.trim());
      }
  
      // Luôn thêm state vì nó là boolean
      params.append("state", state.toString());
  
      // Luôn thêm isAsc vì nó là boolean
      params.append("isAsc", isAsc.toString());
  
      const url = `${BRAND_ENDPOINTS.GET_ALL}?${params.toString()}`;
      console.log(`Making request to: ${url}`);
  
      const response = await apiClient.get(url);
      console.log("Brands API raw response:", response.data);
  
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
            items: [],
          },
        };
      }
  
      // Trả về đúng format như API
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
      console.error("Error fetching all brands:", error);
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
      const response = await apiClient.put(BRAND_ENDPOINTS.UPDATE.replace("{id}", brandId), brandData);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error("Error updating brand:", error);
      throw error;
    }
  }
}

export default new BrandService();