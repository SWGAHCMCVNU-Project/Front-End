import { useState } from "react";
import { createLuckyPrizeAPI } from "../../store/api/luckyPrizeApi";

const useCreateLuckyPrize = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdData, setCreatedData] = useState(null);

  const createPrize = async (prizeData, options) => { // Thêm options
    setLoading(true);
    setError(null);
    try {
      const response = await createLuckyPrizeAPI(prizeData);
      if (response.success) {
        setCreatedData(response.data);
        options?.onSuccess?.(response.data); // Gọi callback thành công
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        options?.onError?.(response); // Gọi callback lỗi
        return { success: false, message: response.message };
      }
    } catch (err) {
      setError("Lỗi khi tạo giải thưởng");
      options?.onError?.({ message: "Lỗi khi tạo giải thưởng" });
      return { success: false, message: "Lỗi khi tạo giải thưởng" };
    } finally {
      setLoading(false);
    }
  };

  return { createPrize, loading, error, createdData };
};

export default useCreateLuckyPrize;