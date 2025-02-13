// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { createEditBrand } from "../../store/api/apiBrands";

// export function useEditBrand() {
//   const queryClient = useQueryClient();
//   const { brandId } = useParams();

//   const { mutate: editBrand, isLoading: isEditing } = useMutation({
//     mutationFn: ({ newBrandData, id }) => createEditBrand(newBrandData, id),
//     onSuccess: () => {
//       toast.success("Thương hiệu cập nhật thành công");
//       queryClient.invalidateQueries({ queryKey: ["brands"] });
//       queryClient.refetchQueries({
//         queryKey: ["brand"],
//         specificKey: brandId,
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   return { isEditing, editBrand };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockBrands } from "./mockBrands";

export function useEditBrand() {
  const queryClient = useQueryClient();

  const { mutate: editBrand, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBrandData, id }) => {
      // Giả lập cập nhật brand
      const index = mockBrands.result.findIndex(brand => brand.id === id);
      if (index !== -1) {
        mockBrands.result[index] = { ...mockBrands.result[index], ...newBrandData };
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success("Thương hiệu cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editBrand };
}