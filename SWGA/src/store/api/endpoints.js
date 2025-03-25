export const AUTH_ENDPOINTS = {
    LOGIN: '/Auth/login',
    LOGOUT: '/logout',
    VERIFY_ACCOUNT: '/Auth/verify-account'
    
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
    GET_VOUCHER_BY_ID: "/Voucher/campaign-detail/{id}"
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
  export const CAMPAIGN_ENDPOINTS = {
    GET_ALL: "/Campaign",
    GET_BY_ID: "/Campaign/{id}",
    CREATE: "/Campaign",
    UPDATE: "/Campaign/{id}",
    GET_ALL_CAMPAIGN: "Campaign/getAll",
    GET_STORE_BY_ID: "Campaign/getStoreByCampaignId/{id}",

  };
  export const CAMPAIGN_DETAIL_ENDPOINTS = {
    GET_VOUCHER: "/CampaignDetail",
    GET_VOUCHER_BY_ID: "/CampaignDetail/{id}",

  };
  export const EMAIL_ENDPOINTS = {
  SEND_CODE_EMAIL_AGAIN: "/Email",

  };
  export const VOUCHER_ITEM_ENDPOINTS = {
    GET_BY_CAMPAIGN_ID: "/VoucherItem",
  };
  export const POINT_PACKAGE = {
    GET_ALL: "/PointPackage",
    GET_BY_ID: "/PointPackage/{id}",
    CREATE: "/PointPackage",
    UPDATE: "/PointPackage/{id}",
  }
  export const PAYMENT = {
    CREATE_PAYMENT_CAMPUS: "/VNPAY/capus-purchase-points",
    CREATE_PAYMENT_BRAND: "/VNPAY/brand-purchase-points"

  }
  export const CAMPUS = {
    GET_ALL: "/Campus",
    GET_BY_ID: "/Campus/{id}",
    CREATE: "/Campus",
    UPDATE: "/Campus/{id}",
  }

