import { useMutation } from "@tanstack/react-query";
import { registerCampusAPI } from '../../store/api/registerAPI';
import toast from 'react-hot-toast';

export function useCreateCampusAccount() {
  const { mutate: createCampusAccount, isLoading: isCreating } = useMutation({
    mutationFn: ({ formData, campusId }) => registerCampusAPI(formData, campusId),
    onSuccess: (data) => {
      if (data.success) {
        // Bỏ console.log
      }
    },
    onError: (error) => {
      console.error("Error creating campus account:", error.message);
      toast.error(error.message); // Hiển thị "Tên tài khoản đã tồn tại!" nếu trùng
    },
  });

  return { createCampusAccount, isCreating };
}