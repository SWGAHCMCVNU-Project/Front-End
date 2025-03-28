import { useState } from 'react';
import { purchasePointsBrand } from '../../store/api/buyPointApi';
import { message } from 'antd';

export const usePurchasePointsBrand = () => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const buyPoints = async (pointPackageId, campusId = null, brandId) => {
    setIsPurchasing(true);
    try {
      const response = await purchasePointsBrand(pointPackageId, campusId, brandId);
      message.success('Khởi tạo thanh toán thành công (Brand)');
      if (response?.paymentUrl) {
        window.location.href = response.paymentUrl;
      }
      return response;
    } catch (error) {
      message.error('Lỗi khi thực hiện thanh toán (Brand): ' + (error.message || 'Vui lòng thử lại'));
      throw error;
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    buyPoints,
    isPurchasing,
  };
};