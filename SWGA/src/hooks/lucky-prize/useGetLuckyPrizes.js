import { useState, useEffect } from "react";
import { getAllLuckyPrizesAPI } from "../../store/api/luckyPrizeApi";

const useGetLuckyPrizes = (params = {}) => {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchPrizes = async () => {
      try {
        const response = await getAllLuckyPrizesAPI(params);
        if (response.success) {
          setPrizes(response.data || []);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Lỗi khi tải danh sách giải thưởng");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPrizes();
    }, [params.page, params.size, params.searchName, params.status, params.isAsc]);
  
    const refetch = () => {
      setLoading(true);
      fetchPrizes();
    };
  
    return { prizes, loading, error, refetch };
  };
export default useGetLuckyPrizes;