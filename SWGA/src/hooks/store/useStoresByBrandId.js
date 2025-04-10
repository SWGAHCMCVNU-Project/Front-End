import { useState, useEffect } from "react";
import { getStoresByBrandIdAPI } from "../../store/api/storeApi";

const useStoresByBrandId = (brandId, initialParams = { page: 1, size: 10, searchName: "" }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialParams.page,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchStores = async (params = initialParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getStoresByBrandIdAPI(brandId, params);
      if (response.success) {
        const fetchedStores = response.data.items || []; // Sử dụng items thay vì stores
        setStores(Array.isArray(fetchedStores) ? fetchedStores : []);
        setPagination({
          currentPage: response.data.page || params.page,
          totalPages: response.data.totalPages || 1,
          totalItems: response.data.total || fetchedStores.length,
        });
      } else {
        setError(response.message);
        setStores([]);
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải danh sách cửa hàng");
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (brandId) {
      fetchStores({ ...initialParams, page: initialParams.page, size: initialParams.size });
    }
  }, [brandId, initialParams.page, initialParams.size]);  // Thêm initialParams.size
  
  const refetch = (newParams) => {
    const updatedParams = { ...initialParams, ...newParams };
    fetchStores(updatedParams);
  };

  return { stores, loading, error, pagination, refetch };
};

export default useStoresByBrandId;