// hooks/useEditArea.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAreaAPI } from "../../store/api/areasApi";
import toast from "react-hot-toast";

export function useEditArea() {
  const queryClient = useQueryClient();

  const { mutate: editArea, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, newAreaData }) => updateAreaAPI(id, newAreaData),
    onSuccess: () => {
      toast.success("Cập nhật khu vực thành công");
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      queryClient.invalidateQueries({ queryKey: ["area"] });
    },
    onError: (err) => {
      console.error("Mutation error:", err);
      toast.error(err.message || "Có lỗi xảy ra khi cập nhật khu vực");
    },
  });

  return { isEditing, editArea };
}