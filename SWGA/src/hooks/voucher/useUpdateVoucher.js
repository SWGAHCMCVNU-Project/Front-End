import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateVoucherAPI } from '../../store/api/voucherApi';

export const useUpdateVoucher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const updateVoucher = async (id, data, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateVoucherAPI(id, data);
      setIsLoading(false);

      queryClient.invalidateQueries(['voucher', id]);
      queryClient.invalidateQueries(['vouchers']);

      if (options.onSuccess) {
        options.onSuccess(response);
      }

      return response;
    } catch (error) {
      console.error('Update Voucher Error:', error); 
      setError(error);
      setIsLoading(false);

      if (options.onError) {
        options.onError(error);
      }

      throw error;
    }
  };

  return { updateVoucher, isLoading, error };
};