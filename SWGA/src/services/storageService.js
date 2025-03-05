const storageService = {
  setAccessToken: (token) => {
    localStorage.setItem('accessToken', token);
  },
  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },
  removeAccessToken: () => {
    localStorage.removeItem('accessToken');
  },
  setRoleLogin: (role) => {
    localStorage.setItem('role', role);
  },
  getRoleLogin: () => {
    return localStorage.getItem('role');
  },
  removeRoleLogin: () => {
    localStorage.removeItem('role');
  },
  // Thêm các hàm liên quan đến registerForm
  setRegisterForm: (formData) => {
    localStorage.setItem('registerForm', JSON.stringify(formData));
  },
  getRegisterForm: () => {
    const formData = localStorage.getItem('registerForm');
    return formData ? JSON.parse(formData) : null;
  },
  removeRegisterForm: () => {
    localStorage.removeItem('registerForm');
  },
};

export default storageService;