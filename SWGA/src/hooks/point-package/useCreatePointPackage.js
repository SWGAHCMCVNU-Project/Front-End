import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPointPackage } from "../../store/api/pointPackageApi";
import { toast } from "react-hot-toast";

export const useCreatePointPackage = () => {
  const queryClient = useQueryClient();

  const { mutate: create, isLoading } = useMutation({
    mutationFn: createPointPackage,
    onSuccess: () => {
      toast.success("Tạo gói điểm thành công");
      queryClient.invalidateQueries({ queryKey: ["pointPackages"] });
    },
    onError: () => toast.error("Không thể tạo gói điểm"),
  });

  return { create, isLoading };
}; 