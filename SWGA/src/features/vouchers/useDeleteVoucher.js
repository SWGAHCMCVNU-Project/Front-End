// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { deleteVoucherById } from "../../store/api/apiVouchers";

// export function useDeleteVoucher() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { isLoading: isDeleting, mutate: deleteVoucher } = useMutation({
//     mutationFn: deleteVoucherById,
//     onSuccess: () => {
//       toast.success("Voucher xóa thành công");
//       queryClient.invalidateQueries({
//         queryKey: ["vouchersByBrandId"],
//       });
//       navigate(`/vouchers`);
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isDeleting, deleteVoucher };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteVoucher() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteVoucher } = useMutation({
    mutationFn: (id) => {
      // Mock delete
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id);
        }, 1000);
      });
    },
    onSuccess: () => {
      toast.success("Voucher xóa thành công");
      queryClient.invalidateQueries({
        queryKey: ["vouchersByBrandId"],
      });
      navigate(`/vouchers`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteVoucher };
}