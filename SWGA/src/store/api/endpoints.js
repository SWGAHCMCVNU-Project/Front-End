export const AUTH_ENDPOINTS = {
    LOGIN: '/Auth/login',
    LOGOUT: '/logout',
  };
  export const ACCOUNT_ENDPOINTS = {
    RegisterBrand: '/Account/brandRegister',
    RegisterStore: '/Account/storeRegister',
    AccountDetail: '/Account/{id}',
    UPDATEACCOUNT: '/Account/{id}',
    LOGOUT: '/logout',
  };
  export const VOUCHER_ENDPOINTS = {
    CREATE: '/Voucher',
    GET_ALL: '/Voucher',
    GET_BY_ID: '/Voucher/{id}',
    UPDATE: "/Voucher/{id}",
  };

  export const VOUCHER_TYPE_ENDPOINTS = {
    GET_ALL: "/VoucherType",
    GET_BY_ID: "/VoucherType/{id}",
    CREATE: "/VoucherType",
    UPDATE: "/VoucherType/{id}",
  };
  export const BRAND_ENDPOINTS = {
    GET_ALL: "/Brand",
    GET_BY_ID: "/Brand/{id}",
    CREATE: "/Brand",
    UPDATE: "/Brand/{id}",
    CREATE_FOR_EXISTING_ACCOUNT: "/Brand/existingAccount"
  };
  export const AREA_ENDPOINTS = {
    CREATE: '/Area/areas',
    GET_ALL: '/Area/areas',
    GET_BY_ID: '/Area/areas/{id}',
    UPDATE: "/Area/areas/{id}"
  };
  export const CAMPAIGN_TYPE_ENDPOINTS = {
    GET_ALL: "/CampaignType",
    GET_BY_ID: "/CampaignType/{id}",
    CREATE: "/CampaignType",
    UPDATE: "/CampaignType/{id}",
  };
  export const STORE_ENDPOINTS = {
    GET_ALL: "/Store",
    GET_BY_ID: "/Store/{id}",
    UPDATE: "/Store/{id}",
  };

