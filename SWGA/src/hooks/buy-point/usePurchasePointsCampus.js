import { useState } from 'react';
import { purchasePointsCampus } from '../../store/api/buyPointApi';
import { message } from 'antd';

export const usePurchasePointsCampus = () => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const buyPoints = async (pointPackageId, campusId, brandId = null) => {
    setIsPurchasing(true);
    try {
      const response = await purchasePointsCampus(pointPackageId, campusId, brandId);
      message.success('Khởi tạo thanh toán thành công (Campus)');
      if (response?.paymentUrl) {
        window.location.href = response.paymentUrl;
      }
      return response;
    } catch (error) {
      message.error('Lỗi khi thực hiện thanh toán (Campus): ' + (error.message || 'Vui lòng thử lại'));
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