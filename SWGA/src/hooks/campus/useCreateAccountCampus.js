import { useMutation } from "@tanstack/react-query";
import { registerCampusAPI } from '../../store/api/registerAPI';
import toast from 'react-hot-toast';

export function useCreateCampusAccount() {
  const { mutate: createCampusAccount, isLoading: isCreating, error } = useMutation({
    mutationFn: ({ formData, campusId }) => registerCampusAPI(formData, campusId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Đăng ký tài khoản campus thành công!");
      }
    },
    onError: (error) => {
      console.error("Error creating campus account:", error.message);
      toast.error(error.message); // Hiển thị "Tên tài khoản đã tồn tại!" nếu trùng
    },
  });

  return { createCampusAccount, isCreating, error };
}