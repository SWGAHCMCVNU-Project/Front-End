// ../../store/api/voucherApi.js
import VoucherService from '../../services/voucherService';

export const createVoucherAPI = async (data) => {
  console.log("Calling createVoucherAPI with data:", data);
  return VoucherService.createVoucher(data);
};

export const getVouchersAPI = async ({ page, size, search, state, isAsc, brandId }) => {
  return VoucherService.getVouchers({ page, size, search, state, isAsc, brandId });
};

export const getVoucherByIdAPI = async (id) => {
  return VoucherService.getVoucherById(id);
};