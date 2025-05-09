import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLecturerStateAPI } from "../../store/api/lecturerApi";

export const useUpdateLecturer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, state }) => updateLecturerStateAPI({ id, state }),
    onSuccess: () => {
      queryClient.invalidateQueries(['lecturers']);
    },
  });
};