import voucherTypeService from "../../services/voucherTypeService";

export const createVoucherTypeAPI = async (data) => {
  return voucherTypeService.createVoucherType(data);
};

export const getVoucherTypesAPI = async ({ page = 1, size = 10, search = "", state = true, isAsc = true }) => {
  return voucherTypeService.getVoucherTypes({ page, size, search, state, isAsc });
};