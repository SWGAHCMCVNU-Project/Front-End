import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'; // Thêm React Query
import { updateVoucherAPI } from '../../store/api/voucherApi';

export const useUpdateVoucher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient(); // Thêm QueryClient để invalidate cache

  const updateVoucher = async (id, data, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateVoucherAPI(id, data);
      setIsLoading(false);

      // Invalidate cache để tự động cập nhật dữ liệu
      queryClient.invalidateQueries(['voucher', id]);
      queryClient.invalidateQueries(['vouchers']); // Nếu có danh sách vouchers

      // Gọi callback onSuccess nếu được truyền vào
      if (options.onSuccess) {
        options.onSuccess(response);
      }

      return response;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      
      // Gọi callback onError nếu được truyền vào
      if (options.onError) {
        options.onError(error);
      }
      
      throw error;
    }
  };

  return { updateVoucher, isLoading, error };
};