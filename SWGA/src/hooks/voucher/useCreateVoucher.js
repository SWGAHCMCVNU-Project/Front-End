import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVoucherAPI } from "../../store/api/voucherApi";
import toast from "react-hot-toast";

export function useCreateVoucher() {
  const queryClient = useQueryClient();

  const { mutate: createVoucher, isLoading: isCreating } = useMutation({
    mutationFn: createVoucherAPI,
    onSuccess: () => {
      toast.success("Tạo phiếu ưu đãi thành công");
      queryClient.invalidateQueries({ queryKey: ["vouchers"] }); // Invalidate query để làm mới danh sách voucher
    },
    onError: (err) => {
      console.error("Mutation error:", err);
      toast.error(err.message || "Có lỗi xảy ra khi tạo phiếu ưu đãi");
    },
  });

  return { isCreating, createVoucher };
}