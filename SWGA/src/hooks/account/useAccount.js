import { useState, useEffect, useCallback } from "react";
import { getAccountByIdAPI } from "../../store/api/registerAPI";
import toast from "react-hot-toast";

const useAccount = (id) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccount = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching account ID:", id);
      const response = await getAccountByIdAPI(id, { noCache: true });

      if (response.success) {
        setAccount(response.data);
      } else {
        throw new Error(response.message || "Lỗi khi lấy dữ liệu");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // 🔥 Hàm cập nhật ngay dữ liệu khi chỉnh sửa
  const updateLocalAccount = (updatedData) => {
    setAccount((prev) => ({ ...prev, ...updatedData }));
  };

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return { account, loading, error, refetch: fetchAccount, updateLocalAccount };
};

export default useAccount;
