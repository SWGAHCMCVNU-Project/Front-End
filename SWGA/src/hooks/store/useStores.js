// hooks/store/useStores.js
import { useQuery } from "@tanstack/react-query";
import { getAllStoresAPI } from "../../store/api/storeApi";

export const useStores = ({ searchName = "", page = 1, size = 100, state, areaId, sort } = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["stores", searchName, page, size, state, areaId, sort],
    queryFn: () =>
      getAllStoresAPI({
        searchName,
        page,
        size,
        state,
        areaId,
        sort,
      }),
    staleTime: 1000 * 60, // Cache trong 1 phút
  });

  // Xử lý dữ liệu trả về từ API
  const stores = data?.data
    ? {
        result: data.data.items || [],
        currentPage: data.data.page || page,
        pageSize: data.data.size || size,
        pageCount: data.data.totalPages || 0,
        totalCount: data.data.total || 0,
      }
    : {
        result: [],
        currentPage: page,
        pageSize: size,
        pageCount: 0,
        totalCount: 0,
      };

  return {
    stores,
    error,
    isLoading,
  };
};