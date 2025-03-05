import toast from "react-hot-toast";
import { registerService } from "../../services/registerService";
import storageService from "../../services/storageService";

export async function registerBrandAPI(brandData, navigate) {
  const formData = new FormData();
  
  formData.append('userName', brandData.userName);
  formData.append('password', brandData.password);
  formData.append('phone', brandData.phone);
  formData.append('email', brandData.email);
  formData.append('brandName', brandData.brandName);
  formData.append('acronym', brandData.acronym || '');
  formData.append('address', brandData.address);
  
  // Convert base64 to file for coverPhoto
  if (brandData.coverPhoto) {
    try {
      // Kiểm tra xem có phải base64 không
      if (brandData.coverPhoto.includes('base64')) {
        const byteString = atob(brandData.coverPhoto.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const file = new File([ab], 'coverPhoto.jpg', { type: 'image/jpeg' });
        formData.append('coverPhoto', file);
      } else {
        throw new Error('Invalid cover photo format');
      }
    } catch (error) {
      console.error('Error converting cover photo:', error);
      throw new Error('Failed to process cover photo');
    }
  } else {
    throw new Error('Cover photo is required');
  }

  formData.append('link', brandData.link || '');
  
  // Format time as "HH:mm"
  const openingTime = `${brandData.openingHours.hours.toString().padStart(2, '0')}:${brandData.openingHours.minutes.toString().padStart(2, '0')}`;
  const closingTime = `${brandData.closingHours.hours.toString().padStart(2, '0')}:${brandData.closingHours.minutes.toString().padStart(2, '0')}`;
  
  formData.append('openingHours', openingTime);
  formData.append('closingHours', closingTime);
  formData.append('description', brandData.description || '');
  formData.append('state', brandData.state);

  try {
    const response = await registerService.registerBrand(formData);
    if (response.status === 201) {
      storageService.removeRegisterForm();
      setTimeout(() => {
        toast.success("Đăng ký thương hiệu thành công");
        navigate("/login");
      }, 1500);
      return response.data;
    } else {
      throw new Error("Đăng ký không thành công, không nhận được mã 201");
    }
  } catch (error) {
    let errorMessage = "Đăng ký thất bại!";
    if (error.response) {
      if (error.response.status === 500) {
        errorMessage = "Lỗi máy chủ, vui lòng thử lại sau!";
      } else if (error.response.status === 415) {
        errorMessage = "Dữ liệu gửi lên không đúng định dạng, vui lòng kiểm tra lại!";
      } else if (error.response.status === 400) {
        errorMessage = error.response.data.message || error.response.data.title || "Dữ liệu không hợp lệ!";
      }
    } else {
      errorMessage = error.message || "Có lỗi xảy ra!";
    }
    toast.error(errorMessage);
    throw error;
  }
}