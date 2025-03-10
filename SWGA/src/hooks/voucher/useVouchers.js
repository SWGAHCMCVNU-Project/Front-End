import { useQuery } from "@tanstack/react-query";
import { getVouchersAPI } from "../../store/api/voucherApi";
import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";

export function useVouchers({ page = 1, size = 10, search = "", state = true, isAsc = true } = {}) {
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const brandId = brand?.id || "";

  const { 
    isLoading: isLoadingVouchers, 
    data: response,
    error 
  } = useQuery({
    queryKey: ["vouchers", page, size, search, state, isAsc, brandId],
    queryFn: () => getVouchersAPI({ page, size, search, state, isAsc, brandId }),
    enabled: !!brandId,
    staleTime: 1000 * 60, // 1 minute
    onError: () => {
      toast.error("Không thể tải danh sách phiếu ưu đãi");
    }
  });

  const isLoading = isLoadingBrand || isLoadingVouchers;

  return { isLoading, error, vouchers: response };
}