import { createVoucherAPI, getVouchersAPI, getVoucherByIdAPI } from "../store/api/voucherApi";
import toast from "react-hot-toast";

class VoucherService {
  async createVoucher(data) {
    try {
      const result = await createVoucherAPI(data);
      if (result.status === 200) {
        toast.success("Tạo phiếu ưu đãi thành công!");
        return result.data;
      }
      toast.error(result.data?.message || "Tạo phiếu ưu đãi thất bại!");
      throw new Error("Create voucher failed");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tạo phiếu ưu đãi!");
      throw error;
    }
  }

  async getVouchers(params) {
    try {
      const result = await getVouchersAPI(params);
      if (result.status === 200) {
        return result.data;
      }
      toast.error(result.data?.message || "Lấy danh sách phiếu ưu đãi thất bại!");
      throw new Error("Get vouchers failed");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi lấy danh sách phiếu ưu đãi!");
      throw error;
    }
  }

  async getVoucherById(id) {
    try {
      const result = await getVoucherByIdAPI(id);
      if (result.status === 200) {
        return result.data;
      }
      toast.error(result.data?.message || "Lấy chi tiết phiếu ưu đãi thất bại!");
      throw new Error("Get voucher details failed");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi lấy chi tiết phiếu ưu đãi!");
      throw error;
    }
  }
}

export default new VoucherService();