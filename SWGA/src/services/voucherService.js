import apiClient from '../store/api/apiClient';
import { VOUCHER_ENDPOINTS } from '../store/api/endpoints';
import toast from 'react-hot-toast';
import StorageService from './storageService';

class VoucherService {
  async createVoucher(data) {
    try {
      // Lấy brandId từ StorageService
      const brandId = StorageService.getBrandId();
      if (!brandId) {
        throw new Error("Brand ID is missing. Please log in or select a brand.");
      }

      const formData = new FormData();
      formData.append("brandId", brandId);
      formData.append("typeId", data.typeId);
      formData.append("voucherName", data.voucherName);
      formData.append("price", Math.floor(Number(data.price)));
      formData.append("rate", Number(data.rate));
      formData.append("condition", data.condition);
      formData.append("description", data.description);
      formData.append("state", data.state === true ? "true" : "false");
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await apiClient.post(VOUCHER_ENDPOINTS.CREATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success("Tạo phiếu ưu đãi thành công!");

      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.message || "Tạo phiếu ưu đãi thất bại");
      }

      throw {
        status: error.response?.status || 500,
        message: error.message || error.response?.data?.message || "Tạo phiếu ưu đãi thất bại",
        details: error.response?.data
      };
    }
  }

  async getVouchers({
    page = 1,
    size = 10,
    search = "",
    state = true,
    isAsc = true,
    brandId = ""
  }) {
    try {
      const validPage = Math.max(1, page);
      if (!brandId) {
        return {
          status: 200,
          data: {
            size: size,
            page: page,
            total: 0,
            totalPages: 0,
            items: []
          }
        };
      }
      
      const params = new URLSearchParams();
      params.append("page", validPage);
      params.append("size", size);
      params.append("brandId", brandId);

      if (search && search.trim() !== "") {
        params.append("search", search.trim());
      }

      params.append("state", state.toString());
      params.append("isAsc", isAsc.toString());

      const url = `${VOUCHER_ENDPOINTS.GET_ALL}?${params}`;

      const response = await apiClient.get(url);

      if (!response.data) {
        return {
          status: response.status,
          data: {
            size,
            page,
            total: 0,
            totalPages: 0,
            items: []
          }
        };
      }

      const responseData = {
        status: response.status,
        data: {
          size: response.data.size || size,
          page: response.data.page || page,
          total: response.data.total || 0,
          totalPages: response.data.totalPages || 0,
          items: Array.isArray(response.data.items) ? response.data.items.filter(item => item.brandId === brandId) : []
        }
      };

      return responseData;

    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: {
          size: size,
          page: page,
          total: 0,
          totalPages: 0,
          items: [],
          message: error.response?.data?.message || "Lấy danh sách phiếu ưu đãi thất bại"
        }
      };
    }
  }

  async getVoucherById(id) {
    try {
      const response = await apiClient.get(
        VOUCHER_ENDPOINTS.GET_BY_ID.replace("{id}", id)
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      toast.error(error.response?.data?.message || "Lấy chi tiết phiếu ưu đãi thất bại");
      return {
        status: error.response?.status || 500,
        data: {
          message:
            error.response?.data?.message || "Lấy chi tiết phiếu ưu đãi thất bại",
        },
      };
    }
  }
}

export default new VoucherService();