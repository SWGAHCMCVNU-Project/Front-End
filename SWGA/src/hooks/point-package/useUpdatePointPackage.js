import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePointPackage } from "../../store/api/pointPackageApi";
import { toast } from "react-hot-toast";

export const useUpdatePointPackage = () => {
  const queryClient = useQueryClient();

  const { mutate: update, isLoading } = useMutation({
    mutationFn: ({ id, data }) => updatePointPackage(id, data),
    onSuccess: () => {
      toast.success("Cập nhật gói điểm thành công");
      queryClient.invalidateQueries({ queryKey: ["pointPackages"] });
      queryClient.invalidateQueries({ queryKey: ["pointPackage"] });
    },
    onError: () => toast.error("Không thể cập nhật gói điểm"),
  });

  return { update, isLoading };
}; 