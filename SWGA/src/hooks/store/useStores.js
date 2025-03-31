import { useQuery } from "@tanstack/react-query";
import { getAllStoresAPI } from "../../store/api/storeApi";
import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";
import StorageService from "../../services/storageService";

export const useStores = ({
  searchName = "",
  page = 1,
  size = 10,
  state,
  areaId,
  sort,
} = {}) => {
  const { brand } = useBrand();
  const brandId = brand?.id || StorageService.getBrandId();

  const params = {
    searchName,
    page,
    size,
    state,
    areaId,
    sort,
    ...(brandId && { brandId }),
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["stores", searchName, page, size, state, areaId, sort, brandId],
    queryFn: () => getAllStoresAPI(params),
    staleTime: 1000 * 60,
    enabled: !!brandId,
    onError: (error) => {
      console.error("Error fetching stores:", error);
      toast.error("Không thể tải danh sách cửa hàng");
    },
    onSuccess: (responseData) => {
      console.log("API Response:", responseData);
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