import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudent } from '../../store/api/studentApi';


export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ accountId, state }) => updateStudent(accountId, state),
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]); // Refetch danh sách students
    },
    onError: (error) => {
      console.error("Update failed:", error.response?.data);
    },
  });
};