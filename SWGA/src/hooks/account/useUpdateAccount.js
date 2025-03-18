import { useState, useCallback } from "react";
import { updateAccountIdAPI } from "../../store/api/registerAPI";
import toast from "react-hot-toast";

const useUpdateAccount = (navigate) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateAccount = useCallback(
    async (id, oldPassword, updatedData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await updateAccountIdAPI(id, oldPassword, updatedData, navigate);
        if (response.success) {
          setSuccess(true);
          toast.success("Account updated successfully!");
          return response.data;
        } else {
          setError(response.message);
          toast.error(response.message);
          return null;
        }
      } catch (err) {
        const errorMessage = err.message || "Failed to update account";
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return {
    updateAccount,
    loading,
    error,
    success,
  };
};

export default useUpdateAccount;