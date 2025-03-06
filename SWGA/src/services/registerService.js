import { registerBrandAPI } from '../store/api/registerApi';
import toast from 'react-hot-toast';

class RegisterService {
  async registerBrand(brandData, navigate) {
    try {
      const result = await registerBrandAPI(brandData);

      if (result.status === 200) {
        toast.success('Đăng ký thành công!');
        navigate('/sign-in', { replace: true });
        return result.data;
      } else {
        toast.error(result.data?.message || 'Đăng ký thất bại!');
        throw new Error('Registration failed');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi đăng ký!');
      throw error;
    }
  }

  formatBrandData(formData, coverPhoto) {
    const [openingHours, openingMinutes] = formData.openingHours.split(':');
    const [closingHours, closingMinutes] = formData.closingHours.split(':');

    return {
      userName: formData.userName,
      password: formData.password,
      phone: formData.phone,
      email: formData.email,
      brandName: formData.brandName,
      acronym: formData.acronym || "",
      address: formData.address,
      coverPhoto: coverPhoto,
      link: formData.link || "",
      openingHours: {
        hours: parseInt(openingHours),
        minutes: parseInt(openingMinutes)
      },
      closingHours: {
        hours: parseInt(closingHours),
        minutes: parseInt(closingMinutes)
      },
      description: formData.description || "",
      state: true
    };
  }
}

export default new RegisterService();
