import apiClient from './apiClient';
import { VOUCHER_ITEM_ENDPOINTS } from './endpoints';

export const createVoucherItemAPI = async (data) => {
  try {
    const response = await apiClient.post(VOUCHER_ITEM_ENDPOINTS.CREATE_VOUCHER_ITEM, data);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: { message: error.response?.data?.message || 'Tạo phiếu ưu đãi thất bại' }
    };
  }
};

export const getVoucherItemsAPI = async ({ 
  page = 1, 
  size = 10, 
  search = "", 
  state = null,
  isAsc = false
}) => {
  try {
    const response = await apiClient.get(VOUCHER_ITEM_ENDPOINTS.GET_ALL_VOUCHER_ITEMS, {
      params: { 
        page, 
        size, 
        search: search || undefined,
        state: state ?? undefined,
        isAsc
      }
    });
    return {
      status: response.status,
      data: {
        size: response.data.size,
        page: response.data.page,
        total: response.data.total,
        totalPages: response.data.totalPages,
        items: response.data.items.map(item => ({
          id: item.id,
          brandId: item.brandId,
          brandName: item.brandName,
          typeId: item.typeId,
          typeName: item.typeName,
          voucherName: item.voucherName,
          price: item.price,
          rate: item.rate,
          condition: item.condition,
          image: item.image,
          imageName: item.imageName,
          file: item.file,
          fileName: item.fileName,
          dateCreated: item.dateCreated,
          dateUpdated: item.dateUpdated,
          description: item.description,
          state: item.state,
          status: item.status,
          numberOfItems: item.numberOfItems,
          numberOfItemsAvailable: item.numberOfItemsAvailable
        }))
      }
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: { message: error.response?.data?.message || 'Lấy danh sách phiếu ưu đãi thất bại' }
    };
  }
};

export const getVoucherItemByIdAPI = async (id) => {
  try {
    const response = await apiClient.get(VOUCHER_ITEM_ENDPOINTS.GET_VOUCHER_ITEM_BY_ID.replace('{id}', id));
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: { message: error.response?.data?.message || 'Lấy chi tiết phiếu ưu đãi thất bại' }
    };
  }
}; 