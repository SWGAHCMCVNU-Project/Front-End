// hooks/store/useStoreById.js
import { useQuery } from "@tanstack/react-query";
import { getStoreByIdAPI } from "../../store/api/storeApi";
import toast from "react-hot-toast";

export const useStoreById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["store", id],
    queryFn: () => getStoreByIdAPI(id),
    enabled: !!id, // Chỉ chạy nếu id được cung cấp
    staleTime: 1000 * 60, // Cache 1 phút
    onError: () => toast.error("Không thể tải thông tin cửa hàng"),
  });

  // Xử lý dữ liệu trả về từ API
  const store = data?.data ? data.data : null;

  return {
    store,
    error,
    isLoading,
  };
};