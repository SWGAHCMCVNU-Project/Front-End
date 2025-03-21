import { useState, useCallback } from "react";
import { updateAccountIdAPI } from "../../store/api/registerAPI";
import toast from "react-hot-toast";

const useUpdateAccount = (updateLocalAccount) => {
  const [loading, setLoading] = useState(false);

  const updateAccount = useCallback(async (id, oldPassword, updatedData) => {
    setLoading(true);

    try {
      const { success, message } = await updateAccountIdAPI(id, oldPassword, updatedData);

      if (success) {
        toast.success("Cập nhật thành công!");
        updateLocalAccount(updatedData); // 🔥 Cập nhật dữ liệu ngay lập tức vào UI
      } else {
        toast.error(message || "Cập nhật thất bại");
      }

      setLoading(false);
      return { success, message };
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật");
      setLoading(false);
      return { success: false, message: error.message };
    }
  }, [updateLocalAccount]);

  return { updateAccount, loading };
};

export default useUpdateAccount;
