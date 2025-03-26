import { useState } from "react";
import { updateLuckyPrizeAPI } from "../../store/api/luckyPrizeApi";

const useUpdateLuckyPrize = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  const updatePrize = async ({ id, newData }, options) => { // Nhận object
    setLoading(true);
    setError(null);
    try {
      const response = await updateLuckyPrizeAPI(id, newData);
      if (response.success) {
        setUpdatedData(response.data);
        options?.onSuccess?.(); // Gọi callback thành công
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        options?.onError?.(response); // Gọi callback lỗi
        return { success: false, message: response.message };
      }
    } catch (err) {
      setError("Lỗi khi cập nhật giải thưởng");
      options?.onError?.({ message: "Lỗi khi cập nhật giải thưởng" });
      return { success: false, message: "Lỗi khi cập nhật giải thưởng" };
    } finally {
      setLoading(false);
    }
  };

  return { updatePrize, loading, error, updatedData };
};

export default useUpdateLuckyPrize;