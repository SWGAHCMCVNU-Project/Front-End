import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrandAPI } from "../../store/api/brandApi";
import toast from "react-hot-toast";

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateBrand } = useMutation({
    mutationFn: ({ brandId, brandData }) => updateBrandAPI(brandId, brandData),
    onSuccess: (data) => {
      // Cập nhật cache sau khi thành công
      queryClient.invalidateQueries(["brands"]);
      queryClient.invalidateQueries(["brand", data.data.id]); // Nếu có query getBrandById
      toast.success("Cập nhật thương hiệu thành công!");
    },
    onError: (error) => {
      toast.error(
        error.message || "Đã có lỗi xảy ra khi cập nhật thương hiệu!"
      );
    },
  });

  return { isUpdating, updateBrand };
}