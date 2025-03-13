import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBrandsAPI, updateBrandAPI } from "../../store/api/brandApi";
import { useBrand } from "./useBrand";
import { toast } from "react-hot-toast";

export function useBrands({ page = 1, size = 10, search = "", state = true, isAsc = true } = {}) {
  const queryClient = useQueryClient();
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const brandId = brand?.id || "";

  const { 
    isLoading: isLoadingBrands, 
    data: response,
    error 
  } = useQuery({
    queryKey: ["brands", page, size, search, state, isAsc, brandId],
    queryFn: () => getAllBrandsAPI({ page, size, search, state, isAsc, brandId }),
    enabled: !!brandId,  // Chỉ fetch khi có brandId
    staleTime: 1000 * 60, // 1 phút
    onError: () => {
      toast.error("Không thể tải danh sách thương hiệu");
    }
  });

  const updateBrandMutation = useMutation({
    mutationFn: ({ brandId, brandData }) => updateBrandAPI(brandId, brandData),
    onSuccess: () => {
      // toast.success("Cập nhật thương hiệu thành công!");
      queryClient.invalidateQueries(["brands"]); // Làm mới danh sách thương hiệu
    },
    onError: () => {
      toast.error("Cập nhật thương hiệu thất bại!");
    }
  });

  const updateBrand = (brandId, brandData) => {
    updateBrandMutation.mutate({ brandId, brandData });
  };

  const isLoading = isLoadingBrand || isLoadingBrands;

  return { isLoading, error, brands: response, updateBrand }; 
}
