import { 
  createVoucherItemAPI, 
  getVoucherItemsAPI, 
  getVoucherItemByIdAPI
} from '../store/api/voucherItemApi';
import toast from 'react-hot-toast';

class VoucherItemService {
  async createVoucherItem(data) {
    try {
      const result = await createVoucherItemAPI(data);
      
      if (result.status === 200) {
        toast.success('Tạo phiếu ưu đãi thành công!');
        return result.data;
      } else {
        toast.error(result.data?.message || 'Tạo phiếu ưu đãi thất bại!');
        throw new Error('Create voucher item failed');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi tạo phiếu ưu đãi!');
      throw error;
    }
  }

  async getVoucherItems(params) {
    try {
      const result = await getVoucherItemsAPI(params);
      
      if (result.status === 200) {
        return result.data;
      } else {
        toast.error(result.data?.message || 'Lấy danh sách phiếu ưu đãi thất bại!');
        throw new Error('Get voucher items failed');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi lấy danh sách phiếu ưu đãi!');
      throw error;
    }
  }

  async getVoucherItemById(id) {
    try {
      const result = await getVoucherItemByIdAPI(id);
      
      if (result.status === 200) {
        return result.data;
      } else {
        toast.error(result.data?.message || 'Lấy chi tiết phiếu ưu đãi thất bại!');
        throw new Error('Get voucher item details failed');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi lấy chi tiết phiếu ưu đãi!');
      throw error;
    }
  }
}

export default new VoucherItemService(); 