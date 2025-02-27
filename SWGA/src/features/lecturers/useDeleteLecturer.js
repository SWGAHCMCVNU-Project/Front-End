import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteLecturer() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteLecturer } = useMutation({
    mutationFn: (id) => {
      // Giả lập xóa giảng viên từ mock data
      console.log(`Xóa giảng viên với id: ${id}`);
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success("Giảng viên đã được vô hiệu hóa thành công");
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteLecturer };
}