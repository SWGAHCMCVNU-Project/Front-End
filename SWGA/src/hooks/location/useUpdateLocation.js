import { useMutation, useQueryClient } from '@tanstack/react-query';
import locationApi from '../../store/api/locationApi';

const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (locationData) => {
      const data = await locationApi.updateLocation(locationData);
      return data;
    },
    onSuccess: () => {
      // Invalidate locations query to refetch
      queryClient.invalidateQueries(['locations']);
    },
    onError: (error) => {
      console.error('Error updating location:', error);
    },
  });
};

export default useUpdateLocation;