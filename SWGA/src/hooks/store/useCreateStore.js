import { useState } from 'react';
import { registerStore } from '../../store/api/registerAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useCreateStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const createStore = async (formData) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await registerStore(formData);

      if (response.success) {
        setData(response.data);
        toast.success("Đăng ký store thành công!");
        navigate("/stores", { replace: true });
      } else {
        setError(response.message);
        toast.error(response.message); // Hiển thị "Tên tài khoản đã tồn tại!" nếu trùng
      }

      return response;
    } catch (err) {
      const errorMessage = err.message || "Đã xảy ra lỗi khi đăng ký store";
      setError(errorMessage);
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return { createStore, loading, error, data };
};

export default useCreateStore;