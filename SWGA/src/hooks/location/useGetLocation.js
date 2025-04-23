import { useQuery } from '@tanstack/react-query';
import locationApi from '../../store/api/locationApi';

const useGetLocation = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const data = await locationApi.getAllLocations();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export default useGetLocation;