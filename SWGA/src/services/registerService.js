import toast from 'react-hot-toast';

class RegisterService {
  // Xử lý phản hồi từ API
  async RegisterBrand(apiData, navigate) {
    try {
      if (apiData) { // Giả sử server trả về dữ liệu thành công
        toast.success('Đăng ký thành công!');
        navigate('/sign-in', { replace: true });
        return {
          success: true,
          data: apiData,
        };
      } else {
        toast.error('Đăng ký thất bại!');
        return {
          success: false,
          message: 'Không nhận được dữ liệu từ server!',
        };
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi xử lý đăng ký!');
      return {
        success: false,
        message: 'Lỗi xử lý dữ liệu đăng ký!',
      };
    }
  }

  // Định dạng dữ liệu từ UI trước khi gửi lên server
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

export default RegisterService;