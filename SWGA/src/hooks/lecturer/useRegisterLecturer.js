import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerLecturerAPI } from "../../store/api/registerAPI";
import toast from "react-hot-toast";

export const useRegisterLecturer = () => {
  const queryClient = useQueryClient();

  const { mutate: registerLecturer, isLoading: isCreating, error } = useMutation({
    mutationFn: ({ formData, campusId }) => {
      return registerLecturerAPI(formData, campusId);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Đăng ký giảng viên thành công!");
        // Invalidate lecturer queries to trigger refetch
        queryClient.invalidateQueries({
          queryKey: ["lecturers"],
        });
      }
    },
    onError: (error) => {
      console.error("Error registering lecturer:", error.message);
      toast.error(error.message); // Displays "Tên tài khoản đã tồn tại!" if username exists
    },
  });

  return { registerLecturer, isCreating, error };
};