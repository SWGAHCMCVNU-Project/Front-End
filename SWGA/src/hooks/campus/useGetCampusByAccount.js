import { useQuery } from '@tanstack/react-query';
import { getCampusByAccountIdAPI } from '../../store/api/campusApi';
import toast from 'react-hot-toast';

const useGetCampusByAccountId = (accountId) => {
  return useQuery({
    queryKey: ['campusByAccount', accountId],
    queryFn: () => getCampusByAccountIdAPI(accountId),
    enabled: !!accountId, // Only run query if accountId exists
    onError: (error) => {
      console.error('Error fetching campus by accountId:', error.message);
      toast.error(error.message || 'Lấy thông tin campus theo account thất bại');
    },
    select: (response) => {
      if (response && response.success) {
        if (Array.isArray(response.data)) {
          // If response.data is an array, return the first item's id or null
          return response.data.length > 0 ? { id: response.data[0]?.id } : null;
        }
        // Handle object response
        return response.data?.data || response.data || null;
      }
      return null; // Return null if no valid data
    },
    retry: 1, // Retry once on failure
  });
};

export default useGetCampusByAccountId;