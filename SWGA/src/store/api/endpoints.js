export const ENDPOINTS = {
    activity: {
      base: '/Activity',
      getAll: () => '/Activity', // GET danh sách hoạt động
      create: () => '/Activity', // POST tạo mới hoạt động
      update: (id) => `/Activity/${id}`, // PUT cập nhật hoạt động cụ thể
    },
    admin: {
      base: '/Admin',
      getAll: () => '/Admin', // GET danh sách admin
      create: () => '/Admin', // POST tạo mới admin
      getProfile: (id) => `/Admin/${id}`, // GET thông tin admin cụ thể
      update: (id) => `/Admin/${id}`, // PUT cập nhật thông tin admin cụ thể
    },
    auth: {
      base: '/Auth',
      login: () => '/Auth/login',
      verifyCode: () => '/Auth/verify-code'
    },
    account: {
      base: '/Account',
      registerBrand: () => '/Account/brandRegister'
    }
  };