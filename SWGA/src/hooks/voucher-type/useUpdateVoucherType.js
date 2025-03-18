import { useState, useCallback } from 'react';
import { updateVoucherTypeAPI } from '../../store/api/voucherTypeApi'; // Thay bằng đường dẫn thực tế đến file API

export const useUpdateVoucherType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateVoucherType = useCallback(async (id, voucherData) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await updateVoucherTypeAPI(id, voucherData);
      setData(response.data);
      return response;
    } catch (err) {
      setError({
        status: err.status,
        message: err.message,
        details: err.details
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    updateVoucherType,
    isLoading,
    error,
    data
  };
};