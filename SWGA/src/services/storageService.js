const StorageService = {
  setAccessToken(token) {
    localStorage.setItem("token", token);
  },
  getAccessToken() {
    return localStorage.getItem("token");
  },
  removeAccessToken() {
    localStorage.removeItem("token");
  },
  setUser(user) {
    if (!user) {
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  },
  getAccountId() {
    const user = this.getUser();
    return user?.accountId || "";
  },
  getBrandId() {
    const brandId = localStorage.getItem("brandId");
    if (!brandId) {
      return null;
    }
    return brandId;
  },
  setBrandId(brandId) {
    if (!brandId) {
      return;
    }
    localStorage.setItem("brandId", brandId);
  },
  // Thêm các phương thức cho campusId
  getCampusId() {
    const campusId = localStorage.getItem("campusId");
    if (!campusId) {
      return null;
    }
    return campusId;
  },
  setCampusId(campusId) {
    if (!campusId) {
      return;
    }
    localStorage.setItem("campusId", campusId);
  },
  removeCampusId() {
    localStorage.removeItem("campusId");
  },
  getUserRole() {
    const user = this.getUser();
    return user?.role || "";
  },
  setRoleLogin(role) {
    localStorage.setItem("roleLogin", role);
  },
  getRoleLogin() {
    return localStorage.getItem("roleLogin") || "";
  },
  removeRoleLogin() {
    localStorage.removeItem("roleLogin");
  },
  setNameLogin(name) {
    localStorage.setItem("nameLogin", name);
  },
  getNameLogin() {
    return localStorage.getItem("nameLogin") || "";
  },
  removeNameLogin() {
    localStorage.removeItem("nameLogin");
  },
  setLoginId(id) {
    localStorage.setItem("loginId", id);
  },
  getLoginId() {
    return localStorage.getItem("loginId") || "";
  },
  removeLoginId() {
    localStorage.removeItem("loginId");
  },
  setAvatarLogin(avatar) {
    localStorage.setItem("avatarLogin", avatar);
  },
  getAvatarLogin() {
    return localStorage.getItem("avatarLogin") || "";
  },
  removeAvatarLogin() {
    localStorage.removeItem("avatarLogin");
  },
  isAuthenticated() {
    return !!this.getAccessToken();
  },
  removeUser() {
    localStorage.removeItem("user");
  },
  clearAll() {
    this.removeAccessToken();
    this.removeUser();
    this.removeRoleLogin();
    this.removeNameLogin();
    this.removeLoginId();
    this.removeAvatarLogin();
    localStorage.removeItem("brandId");
    this.removeCampusId(); // Thêm xóa campusId
  },
};

export default StorageService;