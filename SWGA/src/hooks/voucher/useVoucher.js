import { useQuery } from "@tanstack/react-query";
import { getVoucherByIdAPI } from "../../store/api/voucherApi";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useVoucher() {
  const { voucherId } = useParams();

  const { isLoading, data: voucher, error } = useQuery({
    queryKey: ["voucher", voucherId],
    queryFn: () => getVoucherByIdAPI(voucherId),
    enabled: !!voucherId,
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải thông tin voucher"),
  });

  return { isLoading, voucher, error };
}