import * as yup from 'yup';

// Định nghĩa schema validation cho login
const loginSchema = yup.object().shape({
  userName: yup
    .string()
    .required('Tên tài khoản là bắt buộc')
    .trim()
    .min(3, 'Tên tài khoản phải có ít nhất 3 ký tự')
    .max(50, 'Tên tài khoản không được vượt quá 50 ký tự'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(100, 'Mật khẩu không được vượt quá 100 ký tự')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Mật khẩu phải chứa ít nhất một chữ cái và một số'
    ),
});

// Hàm kiểm tra validation
export const validateLogin = async (data) => {
  try {
    await loginSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    return { isValid: false, errors };
  }
};

// Hàm kiểm tra nhanh (nếu cần dùng trong Form)
export const getLoginValidationRules = () => {
  return {
    userName: [
      { required: true, message: 'Vui lòng nhập tên tài khoản!' },
      { min: 3, message: 'Tên tài khoản phải có ít nhất 3 ký tự' },
      { max: 50, message: 'Tên tài khoản không được vượt quá 50 ký tự' },
    ],
    password: [
      { required: true, message: 'Vui lòng nhập mật khẩu!' },
      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
      { max: 100, message: 'Mật khẩu không được vượt quá 100 ký tự' },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: 'Mật khẩu phải chứa ít nhất một chữ cái và một số',
      },
    ],
  };
};