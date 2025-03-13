import { useQuery } from "@tanstack/react-query";
import { getVoucherByIdAPI } from "../../store/api/voucherApi";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useVoucher() {
  const { voucherId } = useParams();

  // Log voucherId để kiểm tra

  const { isLoading, data, error } = useQuery({
    queryKey: ["voucher", voucherId],
    queryFn: () => getVoucherByIdAPI(voucherId),
    enabled: !!voucherId,
    staleTime: 1000 * 60,
    onError: (err) => {
      console.error("Error fetching voucher:", err);
      toast.error("Không thể tải thông tin voucher");
    },
  });

  // Log dữ liệu thô từ API
  

  // Lấy dữ liệu thực tế từ data.data
  const voucher = data?.data || null;

  // Log dữ liệu voucher sau khi xử lý
 

  return { isLoading, voucher, error };
}