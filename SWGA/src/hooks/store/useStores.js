import { useQuery } from "@tanstack/react-query";
import { getAllStoresAPI } from "../../store/api/storeApi";
import { toast } from "react-hot-toast";

export const useStores = ({
  searchName = "",
  page = 1,
  size = 10,
  state,
  areaId,
  sort,
} = {}) => {


  const params = {
    searchName,
    page,
    size,
    state,
    areaId,
    sort,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["stores", searchName, page, size, state, areaId, sort, ],
    queryFn: () => getAllStoresAPI(params),
    staleTime: 1000 * 60,
    onError: (error) => {
      console.error("Error fetching stores:", error);
      toast.error("Không thể tải danh sách cửa hàng");
    },
    
  });

  // Xử lý dữ liệu từ API với giá trị mặc định
  const stores = data?.success && data.data
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

  return { stores, error, isLoading };
};