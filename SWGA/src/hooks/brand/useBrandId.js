// useBrand.js
import { useState, useEffect } from 'react';
import { getBrandByIdAPI } from '../../store/api/brandApi'; // Điều chỉnh đường dẫn theo cấu trúc project của bạn

export const useBrand = (brandId) => {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBrand = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getBrandByIdAPI(id);
      setBrand(response.data);
      return response;
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra khi lấy thông tin thương hiệu!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Tự động fetch khi brandId thay đổi
  useEffect(() => {
    if (brandId) {
      fetchBrand(brandId);
    }
  }, [brandId]);

  // Hàm để refetch manually nếu cần
  const refetch = () => {
    if (brandId) {
      fetchBrand(brandId);
    }
  };

  return {
    brand,      // Dữ liệu thương hiệu
    loading,    // Trạng thái đang tải
    error,      // Lỗi nếu có
    refetch     // Hàm để gọi lại API manually
  };
};

export default useBrand;