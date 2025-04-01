import { useQuery } from "@tanstack/react-query";
import { getVouchersAPI } from "../../store/api/voucherApi";
import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";

export function useVouchers({
  page = 1,
  size = 100,
  search = "",
  state = true,
  isAsc = true,
} = {}) {
  const { brand } = useBrand();
  const brandId = brand?.id || "";

  const queryResult = useQuery({
    queryKey: ["vouchers", page, size, search, state, isAsc, brandId],
    queryFn: async () => {
      const response = await getVouchersAPI({
        page,
        size,
        search,
        state,
        isAsc,
        brandId,
      });
      return response;
    },
    enabled: !!brandId,
    staleTime: 1000 * 60,
    onError: (error) => {
      console.error("Error fetching vouchers:", error);
      toast.error("Không thể tải danh sách phiếu ưu đãi");
    },
  });

  // Handle different response formats
  const totalVouchers =
    queryResult.data?.total ||
    queryResult.data?.data?.total ||
    queryResult.data?.totalCount ||
    0;

  return {
    ...queryResult,
    data: queryResult.data, // Keep original data for debugging
    totalVouchers,
  };
}