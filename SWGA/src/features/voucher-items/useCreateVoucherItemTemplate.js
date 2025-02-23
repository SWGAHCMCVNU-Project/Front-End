// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { createEditVoucherItemTemplate } from "../../store/api/apiVoucherItems";

// export function useCreateVoucherItemTemplate() {
//   const queryClient = useQueryClient();

//   const { mutate: createVoucherItemTemplate, isLoading: isCreating } =
//     useMutation({
//       mutationFn: createEditVoucherItemTemplate,
//       onSuccess: ({ filename, responseData }) => {
//         if (filename === "Exception") {
//           toast.error(
//             "Phiếu ưu đãi mới tạo không thành công. Vui lòng kiểm tra chi tiết trong file."
//           );
//         } else if (filename && filename.includes("Result")) {
//           toast.success("Phiếu ưu đãi mới tạo thành công");
//         }
//         if (filename) {
//           queryClient.setQueryData(["createdVoucherItemFilename"], filename);
//         }

//         if (responseData) {
//           queryClient.setQueryData(
//             ["createdVoucherItemResponseData"],
//             responseData
//           );
//         }
//         queryClient.invalidateQueries({ queryKey: ["voucherItemsByBrandId"] });
//       },
//       onError: (err) => toast.error(err.message),
//     });

//   return { isCreating, createVoucherItemTemplate };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockCreateVoucherTemplateResponse } from "./mockVoucherItems";

export function useCreateVoucherItemTemplate() {
  const queryClient = useQueryClient();

  const { mutate: createVoucherItemTemplate, isLoading: isCreating } =
    useMutation({
      mutationFn: (data) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockCreateVoucherTemplateResponse());
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
          queryClient.setQueryData(["createdVoucherItemFilename"], filename);
        }

        if (responseData) {
          queryClient.setQueryData(
            ["createdVoucherItemResponseData"],
            responseData
          );
        }
        queryClient.invalidateQueries({ queryKey: ["voucherItemsByBrandId"] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isCreating, createVoucherItemTemplate };
}