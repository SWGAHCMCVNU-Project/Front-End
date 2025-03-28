import { useQuery } from "@tanstack/react-query";
import { getAllBrandsAPI } from "../../store/api/brandApi";
import { useBrand } from "./useBrand";
import { toast } from "react-hot-toast";

export function useBrands({ page = 1, size = 10, search = "", state = true, isAsc = true } = {}) {
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const brandId = brand?.id || "";

  // console.log("useBrands called with page:", page); // Debug giá trị page nhận được

  const {
    isLoading: isLoadingBrands,
    data: response,
    error,
    refetch, // Thêm refetch
  } = useQuery({
    queryKey: ["brands", page, size, search, state, isAsc],
    queryFn: () => {
      console.log("Fetching data for page:", page);
      return getAllBrandsAPI({ page, size, search, state, isAsc });
    },
    staleTime: 0, // Tạm thời vô hiệu hóa cache
    cacheTime: 0, // Tạm thời vô hiệu hóa cache
    onSuccess: (data) => {
      // console.log("Data fetched:", data);
    },
    onError: () => {
      toast.error("Không thể tải danh sách thương hiệu");
    },
  });

  const isLoading = isLoadingBrand || isLoadingBrands;

  return { isLoading, error, brands: response, refetch };
}