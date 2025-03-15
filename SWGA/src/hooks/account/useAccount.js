import { useState, useEffect, useCallback } from "react";
import { getAccountByIdAPI } from "../../store/api/registerAPI";
import toast from "react-hot-toast";

const useAccount = (id) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccount = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAccountByIdAPI(id);
      if (response.success) {
        setAccount(response.data);
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch account details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      fetchAccount();
    }
  }, [id, fetchAccount]);

  return {
    account,
    loading,
    error,
    refetch: fetchAccount,
  };
};

export default useAccount;