// hooks/useCreateArea.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAreaAPI } from "../../store/api/areasApi";
import toast from "react-hot-toast";

export function useCreateArea() {
  const queryClient = useQueryClient();

  const { mutate: createArea, isLoading: isCreating } = useMutation({
    mutationFn: createAreaAPI,
    onSuccess: () => {
      toast.success("Tạo khu vực thành công");
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
    onError: (err) => {
      console.error("Mutation error:", err);
      toast.error(err.message || "Có lỗi xảy ra khi tạo khu vực");
    },
  });

  return { isCreating, createArea };
}