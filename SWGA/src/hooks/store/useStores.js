import { useQuery } from "@tanstack/react-query";
import { getAllStoresAPI } from "../../store/api/storeApi";
import StorageService from '../../services/storageService'; // Import StorageService để lấy brandID

export const useStores = ({ 
  searchName = "", 
  page = 1, 
  size = 100, 
  state, 
  areaId, 
  sort 
} = {}) => {
  // Lấy brandID từ StorageService
  const brandID = StorageService.getBrandId();

  const { data, error, isLoading } = useQuery({
    // Thêm brandID vào queryKey để cache riêng cho mỗi brand
    queryKey: ["stores", searchName, page, size, state, areaId, sort, brandID],
    queryFn: () =>
      getAllStoresAPI({
        searchName,
        page,
        size,
        state,
        areaId,
        sort,
        brandID // Truyền brandID vào API
      }),
    staleTime: 1000 * 60, // Cache trong 1 phút
    enabled: !!brandID // Chỉ gọi API khi có brandID (tùy chọn)
  });

  // Xử lý dữ liệu trả về từ API
  const stores = data?.data
    ? {
      result: (data.data.items || []).filter(store => store.brandId === brandID), // Lọc theo brandID        currentPage: data.data.page || page,
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