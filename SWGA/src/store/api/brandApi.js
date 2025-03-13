import brandService from "../../services/brandService";

// Lấy thông tin brand theo ID
export const getBrandByIdAPI = async (brandId) => {
  return brandService.getBrandById(brandId);
};

// Lấy tất cả brands
export const getAllBrandsAPI = async (params) => {
  return brandService.getAllBrands(params);
};

// Lấy brand theo accountId
export const getBrandByAccountIdAPI = async () => {
  return brandService.getBrandByAccountId();
};
export const updateBrandAPI = async (brandId, brandData) => {
  const response = await brandService.updateBrand(brandId, brandData);
  return response;
};