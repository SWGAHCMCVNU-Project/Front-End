import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPointPackage } from "../../store/api/pointPackageApi"; // Đường dẫn tới file API
import { toast } from "react-hot-toast";

export const useCreatePointPackage = () => {
  const queryClient = useQueryClient();

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createPointPackage(data),
    onSuccess: () => {
      toast.success("Tạo gói điểm thành công!");
      queryClient.invalidateQueries(["pointPackages"]); // Làm mới danh sách gói điểm
    },
    onError: (error) => {
      toast.error(error.message || "Tạo gói điểm thất bại!");
    },
  });

  return { create, isCreating };
};