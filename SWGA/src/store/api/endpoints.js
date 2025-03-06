export const AUTH_ENDPOINTS = {
    LOGIN: '/Auth/login',
    LOGOUT: '/logout',
  };
  export const REGISTER_ENDPOINTS = {
    RegisterBrand: '/Account/brandRegister',
    LOGOUT: '/logout',
  };
  export const VOUCHER_ENDPOINTS = {
    CREATE_VOUCHER: '/Voucher',
    GET_ALL_VOUCHERS: '/Voucher',
    GET_VOUCHER_BY_ID: '/Voucher/{id}'
  };

  export const VOUCHER_ITEM_ENDPOINTS = {
    CREATE_VOUCHER_ITEM: '/VoucherItem',
    GET_ALL_VOUCHER_ITEMS: '/VoucherItem',
    GET_VOUCHER_ITEM_BY_ID: '/VoucherItem/{id}'
  };