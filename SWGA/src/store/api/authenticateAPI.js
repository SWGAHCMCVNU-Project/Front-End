import toast from "react-hot-toast";
import { authService } from "../../services/authService";
import storageService from "../../services/storageService";

export async function loginAPI(credentials, navigate) {
  try {
    const response = await authService.login(credentials);
    const token = response.data?.token || response.data?.access_token || response.token;
    if (token) {
      storageService.setAccessToken(token);
      setTimeout(() => {
        toast.success("Đăng nhập thành công");
        navigate && navigate("/dashboard");
      }, 1500);
      return response;
    } else {
      throw new Error("Token không được trả về từ server");
    }
  } catch (error) {
    if (error.response?.status === 500) {
      toast.error("Lỗi máy chủ, vui lòng thử lại sau!");
    } else {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
    return Promise.reject(error);
  }
}