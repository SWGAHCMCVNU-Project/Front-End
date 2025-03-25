// store/hooks/useGetCampusById.js
import { useQuery } from '@tanstack/react-query';
import { getCampusByIdAPI } from '../../store/api/campusApi';
import toast from 'react-hot-toast';

// Hook to fetch a campus by ID
const useGetCampusById = (id) => {
  return useQuery({
    queryKey: ['campus', id],
    queryFn: () => getCampusByIdAPI(id),
    enabled: !!id, // Only run the query if an ID is provided
    onError: (error) => {
      console.error('Error fetching campus:', error.message);
      toast.error(error.message || 'Lấy thông tin campus thất bại');
    },
    select: (response) => response, // Return the full response object { status, success, data/message }
  });
};

export default useGetCampusById;