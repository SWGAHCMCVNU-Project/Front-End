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
    error 
  } = useQuery({
    queryKey: ["brands", page, size, search, state, isAsc],
    queryFn: () => getAllBrandsAPI({ page, size, search, state, isAsc }),
    staleTime: 1000 * 60,
    onError: () => {
      toast.error("Không thể tải danh sách thương hiệu");
    },
  });

  const isLoading = isLoadingBrand || isLoadingBrands;

  return { isLoading, error, brands: response }; 
}