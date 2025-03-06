const StorageService = {
  setAccessToken(token) {
    localStorage.setItem('token', token);
  },

  getAccessToken() {
    return localStorage.getItem('token');
  },

  removeAccessToken() {
    localStorage.removeItem('token');
  },

  setUser(user) {
    if (!user) {
      console.warn('Attempted to store invalid user data:', user);
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user:', error);
      return null;
    }
  },

  getUserRole() {
    const user = this.getUser();
    return user?.role || '';
  },

  setRoleLogin(role) {
    localStorage.setItem('roleLogin', role);
  },

  getRoleLogin() {
    return localStorage.getItem('roleLogin') || '';
  },

  removeRoleLogin() {
    localStorage.removeItem('roleLogin');
  },

  isAuthenticated() {
    return !!this.getAccessToken();
  },

  removeUser() {
    localStorage.removeItem('user');
  },

  clearAll() {
    this.removeAccessToken();
    this.removeUser();
    this.removeRoleLogin();
  }
};

export default StorageService;