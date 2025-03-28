// store/hooks/useUpdateCampus.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCampusAPI } from '../../store/api/campusApi';

const useUpdateCampus = () => {
  const queryClient = useQueryClient();

  const { mutate: editCampus, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, formData }) => updateCampusAPI(id, formData),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate both the campuses list and the specific campus query
        queryClient.invalidateQueries(['campuses']);
        queryClient.invalidateQueries(['campus']);
      }
    },
    onError: (error) => {
      console.error('Error updating campus:', error.message);
    },
  });

  return { isEditing, editCampus };
};

export default useUpdateCampus;