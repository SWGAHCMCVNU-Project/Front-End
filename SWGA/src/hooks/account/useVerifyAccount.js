// useVerifyAccount.js
import { useState, useCallback } from 'react';
import { verifyAccount } from '../../store/api/authApi'; // Điều chỉnh path theo cấu trúc dự án của bạn

export const useVerifyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyUserAccount = useCallback(async (id, email, code) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await verifyAccount(id, email, code);
      if (!result.success) {
        setError(result.message);
      }
      return result;
    } catch (err) {
      setError('Lỗi khi xác minh tài khoản!');
      return {
        success: false,
        message: 'Lỗi khi xác minh tài khoản!'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    verifyUserAccount
  };
};