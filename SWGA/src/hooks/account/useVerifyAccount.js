// useVerifyAccount.js
import { useState, useCallback } from 'react';
import { verifyAccount, resendVerificationCode as resendCode } from '../../store/api/authApi'; // Điều chỉnh path theo cấu trúc dự án của bạn

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
      const errorMessage = 'Lỗi khi xác minh tài khoản!';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resendVerificationCode = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await resendCode(email);
      if (!result.success) {
        setError(result.message);
      }
      return result;
    } catch (err) {
      const errorMessage = 'Lỗi khi gửi lại mã!';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    verifyUserAccount,
    resendVerificationCode
  };
};