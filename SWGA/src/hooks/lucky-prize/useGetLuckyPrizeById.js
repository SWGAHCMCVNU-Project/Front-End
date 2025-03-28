import { useState, useEffect } from "react";
import { getLuckyPrizeByIdAPI } from "../../store/api/luckyPrizeApi";

const useGetLuckyPrizeById = (id) => {
  const [prize, setPrize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrize = async () => {
    try {
      const response = await getLuckyPrizeByIdAPI(id);
      if (response.success) {
        setPrize(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Lỗi khi tải thông tin giải thưởng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPrize();
  }, [id]);

  const refetch = () => {
    if (!id) return;
    setLoading(true);
    fetchPrize();
  };

  return { prize, loading, error, refetch };
};

export default useGetLuckyPrizeById;