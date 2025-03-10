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
      console.warn("Attempted to store invalid user data:", user);
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
      console.error("Error parsing user:", error);
      return null;
    }
  },
  getAccountId() {
    const user = this.getUser();
    return user?.accountId || "";
  },
  getBrandId() {
    const brandId = localStorage.getItem("brandId");
    console.log("Getting brandId from storage:", brandId);
    if (!brandId) {
      console.warn("No brandId found in storage");
    }
    return brandId;
  },
  setBrandId(brandId) {
    if (!brandId) {
      console.warn("Attempting to set empty brandId");
      return;
    }
    console.log("Setting brandId in storage:", brandId);
    localStorage.setItem("brandId", brandId);
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
    localStorage.removeItem("brandId");
  },
};

export default StorageService;