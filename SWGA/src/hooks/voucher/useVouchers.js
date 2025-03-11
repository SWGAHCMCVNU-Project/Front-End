import { useQuery } from "@tanstack/react-query";
import { getVouchersAPI } from "../../store/api/voucherApi";
import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";

export function useVouchers({ page = 1, size = 10, search = "", state = true, isAsc = true } = {}) {
  const { brand } = useBrand();
  const brandId = brand?.id || "";

  const { isLoading, data: vouchers, error } = useQuery({
    queryKey: ["vouchers", page, size, search, state, isAsc, brandId],
    queryFn: () => getVouchersAPI({ page, size, search, state, isAsc, brandId }),
    enabled: !!brandId, // Chỉ fetch khi brandId tồn tại
    staleTime: 1000 * 60, // Cache trong 1 phút
    onError: () => toast.error("Không thể tải danh sách phiếu ưu đãi"),
  });

  return { isLoading, vouchers, error };
}