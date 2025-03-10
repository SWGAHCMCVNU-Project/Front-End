import { getBrandByAccountIdAPI, getBrandByIdAPI, getAllBrandsAPI } from "../store/api/brandApi";
import toast from "react-hot-toast";

class BrandService {
  async getBrandByAccountId() {
    try {
      const result = await getBrandByAccountIdAPI();
      
      if (result) {
        console.log("Brand service result:", result);
        return result;
      } else {
        console.warn("No brand data returned from API");
        toast.error("Không tìm thấy thông tin thương hiệu");
        throw new Error("Get brand failed");
      }
    } catch (error) {
      console.error("Brand service error:", error);
      toast.error(error.message || "Đã có lỗi xảy ra khi lấy thông tin thương hiệu!");
      throw error;
    }
  }
  
  async getBrandById(brandId) {
    try {
      const result = await getBrandByIdAPI(brandId);
      
      if (result.status === 200) {
        return result.data;
      } else {
        toast.error(result.data?.message || "Lấy thông tin thương hiệu thất bại!");
        throw new Error("Get brand by ID failed");
      }
    } catch (error) {
      console.error("Brand service error:", error);
      toast.error(error.message || "Đã có lỗi xảy ra khi lấy thông tin thương hiệu!");
      throw error;
    }
  }
  
  async getAllBrands() {
    try {
      const result = await getAllBrandsAPI();
      
      if (result.status === 200) {
        return result.data;
      } else {
        toast.error(result.data?.message || "Lấy danh sách thương hiệu thất bại!");
        throw new Error("Get all brands failed");
      }
    } catch (error) {
      console.error("Brand service error:", error);
      toast.error(error.message || "Đã có lỗi xảy ra khi lấy danh sách thương hiệu!");
      throw error;
    }
  }
}

export default new BrandService(); 