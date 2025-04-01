// useBrands.js
import { useQuery } from "@tanstack/react-query";
import { getAllBrandsAPI } from "../../store/api/brandApi";
import { useBrand } from "./useBrand";
import { toast } from "react-hot-toast";

export function useBrands({ page = 1, size = 10, search = "", state = true, isAsc = true } = {}) {
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const brandId = brand?.id || "";

  const {
    isLoading: isLoadingBrands,
    data: response,
    error,
    refetch,
  } = useQuery({
    queryKey: ["brands", page, size, search, state, isAsc],
    queryFn: () => {
      return getAllBrandsAPI({ page, size, search, state, isAsc });
    },
    staleTime: 0,
    cacheTime: 0,
    onError: () => {
      toast.error("Không thể tải danh sách thương hiệu");
    },
  });

  const isLoading = isLoadingBrand || isLoadingBrands;

  // Kiểm tra các format khác nhau của response
  const totalBrands = response?.total || response?.data?.total || response?.totalCount || 0;

  return { 
    isLoading, 
    error, 
    brands: response, // Giữ nguyên toàn bộ response
    totalBrands, // Thử các field khác nhau
    refetch 
  };
}