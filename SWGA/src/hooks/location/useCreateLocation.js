import { useMutation, useQueryClient } from '@tanstack/react-query';
import locationApi from '../../store/api/locationApi';

const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (locationData) => {
      const data = await locationApi.createLocation(locationData);
      return data;
    },
    onSuccess: () => {
      // Invalidate locations query to refetch
      queryClient.invalidateQueries(['locations']);
    },
    onError: (error) => {
      console.error('Error creating location:', error);
    },
  });
};

export default useCreateLocation;