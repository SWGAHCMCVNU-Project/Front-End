// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { deleteVoucherItemById } from "../../store/api/apiVoucherItems";

// export function useDeleteVoucherItem() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { isLoading: isDeleting, mutate: deleteVoucherItem } = useMutation({
//     mutationFn: deleteVoucherItemById,
//     onSuccess: () => {
//       toast.success("Phiếu ưu đãi xóa thành công");
//       queryClient.invalidateQueries({
//         queryKey: ["voucherItemsByBrandId"],
//       });
//       navigate(`/voucher-items`);
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isDeleting, deleteVoucherItem };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteVoucherItem() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteVoucherItem } = useMutation({
    mutationFn: (id) => {
      // Giả lập xóa thành công
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: "Xóa thành công" });
        }, 1000);
      });
    },
    onSuccess: () => {
      toast.success("Phiếu ưu đãi xóa thành công");
      queryClient.invalidateQueries({
        queryKey: ["voucherItemsByBrandId"],
      });
      navigate(`/voucher-items`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteVoucherItem };
}