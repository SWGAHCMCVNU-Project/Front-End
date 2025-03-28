import { useQuery } from "@tanstack/react-query";
import { getAllStoresAPI } from "../../store/api/storeApi";
import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";
import StorageService from "../../services/storageService";

export const useStores = ({
  searchName = "",
  page = 1,
  size = 10, // Sửa thành 10
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
  ...(brandId && { brandId }), // Key phải khớp với tên tham số backend mong đợi
};

  const { data, error, isLoading } = useQuery({
    queryKey: ["stores", searchName, page, size, state, areaId, sort, brandId],
    queryFn: () => getAllStoresAPI(params),
    staleTime: 1000 * 60,
    enabled: !!brandId, // Sửa điều kiện enabled
    onError: (error) => {
      console.error("Error fetching stores:", error);
      toast.error("Không thể tải danh sách cửa hàng");
    },
    onSuccess: (responseData) => {
      console.log("API Response:", responseData); // Thêm log debug
    },
  });

  // Xử lý dữ liệu từ API
  let stores = data?.data
    ? {
        result: data.data.items || [],
        currentPage: data.data.page || page,
        pageSize: data.data.size || size,
        pageCount: data.data.totalPages || 0,
        totalCount: data.data.total || 0,
      }
    : null;

  return { stores, error, isLoading };
};