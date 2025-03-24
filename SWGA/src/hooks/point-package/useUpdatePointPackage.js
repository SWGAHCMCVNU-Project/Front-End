import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePointPackage } from "../../store/api/pointPackageApi"; // Đường dẫn tới file API
import { toast } from "react-hot-toast";

export const useUpdatePointPackage = () => {
  const queryClient = useQueryClient();

  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updatePointPackage(id, data),
    onSuccess: () => {
      toast.success("Cập nhật gói điểm thành công!");
      queryClient.invalidateQueries(["pointPackages"]); // Làm mới danh sách gói điểm
      queryClient.invalidateQueries(["pointPackage"]); // Làm mới thông tin chi tiết gói điểm
    },
    onError: (error) => {
      toast.error(error.message || "Cập nhật gói điểm thất bại!");
    },
  });

  return { update, isUpdating };
};