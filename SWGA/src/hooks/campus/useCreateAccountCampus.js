import { useMutation } from "@tanstack/react-query";
import { registerCampusAPI } from '../../store/api/registerAPI';

export function useCreateCampusAccount() {
  const { mutate: createCampusAccount, isLoading: isCreating } = useMutation({
    mutationFn: ({ formData, campusId }) => registerCampusAPI(formData, campusId),
    onSuccess: (data) => {
      if (data.success) {
        console.log("Campus account created successfully:", data);
      }
    },
    onError: (error) => {
      console.error("Error creating campus account:", error);
    },
  });

  return { createCampusAccount, isCreating };
}