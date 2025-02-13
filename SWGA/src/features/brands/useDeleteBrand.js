// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { deleteBrandById } from "../../store/api/apiBrands";

// export function useDeleteBrand() {
//   const queryClient = useQueryClient();

//   const { isLoading: isDeleting, mutate: deleteBrand } = useMutation({
//     mutationFn: deleteBrandById,
//     onSuccess: () => {
//       toast.success("Thương hiệu xóa thành công");
//       queryClient.invalidateQueries({
//         queryKey: ["brands"],
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isDeleting, deleteBrand };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockBrands } from "./mockBrands";

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBrand } = useMutation({
    mutationFn: (id) => {
      // Giả lập xóa brand
      const index = mockBrands.result.findIndex(brand => brand.id === id);
      if (index !== -1) {
        mockBrands.result.splice(index, 1);
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success("Thương hiệu xóa thành công");
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBrand };
}