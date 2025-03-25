// hooks/campus/useCreateCampus.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCampusAPI } from '../../store/api/campusApi';

export const useCreateCampus = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createCampusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['campus']);
    },
    onError: (error) => {
      console.error('Error creating campus:', error.message);
    },
  });

  return { 
    isCreating: isLoading,
    createCampus: mutate
  };
};