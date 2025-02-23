// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { createEditVoucherItem } from "../../store/api/apiVoucherItems";

// export function useCreateVoucherItem() {
//   const queryClient = useQueryClient();

//   const { mutate: createVoucherItem, isLoading: isCreating } = useMutation({
//     mutationFn: createEditVoucherItem,
//     onSuccess: ({ filename, responseData }) => {
//       toast.success("Phiếu ưu đãi mới tạo thành công");
//       if (filename) {
//         queryClient.setQueryData(["filename"], filename);
//       }

//       if (responseData) {
//         queryClient.setQueryData(["responseData"], responseData);
//       }
//       queryClient.invalidateQueries({ queryKey: ["voucherItemsByBrandId"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   return { isCreating, createVoucherItem };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockVoucherItems } from "./mockVoucherItems";

export function useCreateVoucherItem() {
  const queryClient = useQueryClient();

  const { mutate: createVoucherItem, isLoading: isCreating } = useMutation({
    mutationFn: (newVoucherItem) => {
      // Mock API response
      return new Promise((resolve) => {
        setTimeout(() => {
          // Tạo một voucher mới dựa trên mẫu từ mockVoucherItems
          const newVoucher = {
            id: `VI${String(mockVoucherItems.result.length + 1).padStart(3, '0')}`,
            dateCreated: new Date().toISOString(),
            status: "active",
            ...newVoucherItem
          };
          
          // Thêm voucher mới vào mock data
          mockVoucherItems.result.push(newVoucher);
          mockVoucherItems.totalCount += 1;
          mockVoucherItems.rowCount += 1;

          resolve({
            filename: "VoucherItems_Result",
            responseData: newVoucher
          });
        }, 1000);
      });
    },
    onSuccess: ({ filename, responseData }) => {
      if (filename === "Exception") {
        toast.error(
          "Phiếu ưu đãi mới tạo không thành công. Vui lòng kiểm tra chi tiết trong file."
        );
      } else if (filename && filename.includes("Result")) {
        toast.success("Phiếu ưu đãi mới tạo thành công");
      }
      if (filename) {
        queryClient.setQueryData(["filename"], filename);
      }

      if (responseData) {
        queryClient.setQueryData(["responseData"], responseData);
      }
      queryClient.invalidateQueries({ queryKey: ["voucherItemsByBrandId"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createVoucherItem };
}