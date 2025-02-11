// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { createEditBrand } from "../../store/api/apiBrands";

// export function useCreateBrand() {
//   const queryClient = useQueryClient();

//   const { mutate: createBrand, isLoading: isCreating } = useMutation({
//     mutationFn: createEditBrand,
//     onSuccess: () => {
//       toast.success("Thương hiệu mới tạo thành công");
//       queryClient.invalidateQueries({ queryKey: ["brands"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   return { isCreating, createBrand };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockBrands } from "./mockBrands";

export function useCreateBrand() {
  const queryClient = useQueryClient();

  const { mutate: createBrand, isLoading: isCreating } = useMutation({
    mutationFn: (newBrand) => {
      // Giả lập tạo brand mới
      const newId = mockBrands.result.length + 1;
      mockBrands.result.push({ ...newBrand, id: newId });
      return Promise.resolve(newBrand);
    },
    onSuccess: () => {
      toast.success("Thương hiệu mới tạo thành công");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createBrand };
}