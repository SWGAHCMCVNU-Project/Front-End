import apiClient from "./apiClient";
import { BRAND_ENDPOINTS } from "./endpoints";
import storageService from "../../services/storageService";

// Lấy thông tin brand theo ID
export const getBrandByIdAPI = async (brandId) => {
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
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Lấy thông tin thương hiệu thất bại",
      details: error.response?.data || error.message
    };
  }
};

// Lấy tất cả brands
export const getAllBrandsAPI = async () => {
  try {
    console.log("Fetching all brands");
    const response = await apiClient.get(BRAND_ENDPOINTS.GET_ALL);
    
    console.log("All brands API response:", response);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching all brands:", error);
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Lấy danh sách thương hiệu thất bại",
      details: error.response?.data || error.message
    };
  }
};

// Lấy brand theo accountId
export const getBrandByAccountIdAPI = async () => {
  try {
    // Lấy accountId từ user để tìm brand
    const accountId = storageService.getAccountId();
    console.log("Finding brand using accountId:", accountId);
    
    if (!accountId) {
      throw new Error("Không tìm thấy thông tin tài khoản");
    }
    
    // Lấy tất cả brands và tìm theo accountId
    const allBrandsResponse = await getAllBrandsAPI();
    
    if (allBrandsResponse.status === 200) {
      const brands = Array.isArray(allBrandsResponse.data) 
        ? allBrandsResponse.data 
        : (allBrandsResponse.data?.items || []);
      
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
        const brandResponse = await getBrandByIdAPI(savedBrandId);
        if (brandResponse.status === 200) {
          return brandResponse.data;
        }
      } catch (error) {
        console.warn("Failed to get brand with saved brandId:", error);
      }
    }
    
    throw new Error("Không tìm thấy thông tin thương hiệu");
  } catch (error) {
    console.error("Error in getBrandByAccountIdAPI:", error);
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Lấy thông tin thương hiệu thất bại",
      details: error.message
    };
  }
};
