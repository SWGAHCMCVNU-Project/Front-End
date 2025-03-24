import { useState } from 'react';
import { purchasePoints } from '../../store/api/buyPointApi'; // Giả sử đây là đường dẫn đến file chứa purchasePoints
import { message } from 'antd';

export const usePurchasePoints = () => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  const buyPoints = async (pointPackageId, campusId) => {
    setIsPurchasing(true);
    try {
      const response = await purchasePoints(pointPackageId, campusId);
      message.success('Khởi tạo thanh toán thành công');
      // Chuyển hướng đến URL thanh toán nếu có
      if (response?.paymentUrl) {
        window.location.href = response.paymentUrl;
      }
      return response;
    } catch (error) {
      message.error('Lỗi khi thực hiện thanh toán: ' + (error.message || 'Vui lòng thử lại'));
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