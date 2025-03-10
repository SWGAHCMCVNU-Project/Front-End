import { createVoucherTypeAPI, getVoucherTypesAPI } from "../store/api/voucherTypeApi";
import toast from "react-hot-toast";

class VoucherTypeService {
  async createVoucherType(data) {
    try {
      const result = await createVoucherTypeAPI(data);
      if (result.status >= 200 && result.status < 300) {
        toast.success("Tạo loại ưu đãi thành công!");
        return result.data;
      }
      toast.error(result.data?.message || "Tạo loại ưu đãi thất bại!");
      throw new Error(result.data?.message || "Create voucher type failed");
    } catch (error) {
      toast.error(error.message || "Đã có lỗi xảy ra khi tạo loại ưu đãi!");
      throw error;
    }
  }

  async getVoucherTypes() {
    try {
      const result = await getVoucherTypesAPI();
      if (result.status >= 200 && result.status < 300) {
        return result.data;
      }
      toast.error(result.data?.message || "Lấy danh sách loại ưu đãi thất bại!");
      throw new Error(result.data?.message || "Get voucher types failed");
    } catch (error) {
      toast.error(error.message || "Đã có lỗi xảy ra khi lấy danh sách loại ưu đãi!");
      throw error;
    }
  }
}

export default new VoucherTypeService();