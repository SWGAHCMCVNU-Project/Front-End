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
      if (response?.success) {
        // Giả sử response.data là object chứa thông tin campus
        return response.data?.id || null;
      }
      return null;
    },
    retry: 1, // Retry once on failure
  });
};

export default useGetCampusByAccountId;