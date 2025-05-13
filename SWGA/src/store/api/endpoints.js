export const AUTH_ENDPOINTS = {
    LOGIN: '/Auth/login',
    LOGOUT: '/logout',
    VERIFY_ACCOUNT: '/Auth/verify-account'
    
  };
  export const ACCOUNT_ENDPOINTS = {
    RegisterBrand: '/Account/brandRegister',
    RegisterStore: '/Account/storeRegister',
    RegisterCampus: '/Account/campusRegister',
    RegisterLecturer: '/Account/lecturerRegister',
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
    CREATE_FOR_EXISTING_ACCOUNT: "/Brand/existingAccount",
    GET_BY_ID_ACCOUNT: "/Brand/account/{id}"
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
    GET_ALL: "/Store/brand",
    GET_BY_ID: "/Store/{id}",
    UPDATE: "/Store/{id}",
    GET_STORE_BY_ID: "/Store/brand/{id}"

  };
  export const CAMPAIGN_ENDPOINTS = {
    GET_ALL: "/Campaign",
    GET_BY_ID: "/Campaign/{id}/allStatus",
    CREATE: "/Campaign",
    UPDATE: "/Campaign/{id}",
    GET_ALL_CAMPAIGN: "/Campaign/getCampaignsAllStatus",
    GET_STORE_BY_ID: "/Campaign/getStoreByCampaignId/{id}",
    GET_CAMPAIGN_BY_ID: "/Campaign/brandAllStatus/{id}",
    CHANGE_STATUS_OF_CAMPAIGN: "/Campaign/approve-camp"
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
    CREATE_PAYMENT_CAMPUS: "/VNPAY/campus-purchase-points",
    CREATE_PAYMENT_BRAND: "/VNPAY/brand-purchase-points",
    CALL_BACK_PAYMENT: "/VNPAY/Callback",
    GET_HISTORY_PURCHASE: "/VNPAY/get-all-history-by-id",
  }
  export const CAMPUS = {
    DISTRIBUTE_POINT: "/Campus/distribute-points",
    GET_ALL: "/Campus",
    GET_BY_ID: "/Campus/{id}",
    CREATE: "/Campus",
    UPDATE: "/Campus/{id}",
    GET_BY_ID_ACCOUNT: "/Campus/account/{id}",
  }
  export const LUCKY_PRIZE = {
    CREATE: "/LuckyPrize",
    GET_ALL: "/LuckyPrize",
    UPDATE: "/LuckyPrize/{id}"
  }
  export const STUDENT = {
    GET_ALL: "/Student",
    GET_BY_ID: "/Student/{id}",
  }
  export const CHALLENGE = {
    CREATE: "/Challenge",
    GET_ALL: "/Challenge",
    UPDATE : "/Challenge/{id}"
  }
  export const WALLET = {
    GET_WALLET: "/Wallet/get-wallet-by-brand-id",
    GET_WALLET_CAMPUS: "/Wallet/get-wallet-by-campus-id"
  }
  export const LECTURER = {
    GET_ALL: "/Lecturer/campus",
    UPDATE_STATUS: "/Lecturer/{id}",
  }
  export const LOCATION = {
    CREATE: "/Location/create-location",
    GET_ALL: "/Location",
    UPDATE: "/Location"
  }
  export const RANKING = {
    RANKING_STUDENT_ADMIN: "/Ranking/{id}admin/student-ranking",
    RANKING_BRAND_ADMIN: "/Ranking/{id}admin/brand-ranking",
    RANKING_STUDENT_BRAND: "/Ranking/{id}brand/student-ranking",
    RANKING_CAMPAIGN_BRAND: "/Ranking/{id}brand/campaign-ranking",

  }
  export const CAMP_TRANSATION = {
    HISTORY_OF_CAMP_TRANSATION: "/CampTransation/GetByBrand"
  }