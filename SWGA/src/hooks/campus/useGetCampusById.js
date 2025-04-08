import { useQuery } from '@tanstack/react-query';
import { getCampusByIdAPI } from '../../store/api/campusApi';
import toast from 'react-hot-toast';

const useGetCampusById = (id) => {
  return useQuery({
    queryKey: ['campus', id],
    queryFn: () => getCampusByIdAPI(id),
    enabled: !!id, // Chỉ chạy query nếu có ID
    onError: (error) => {
      console.error('Error fetching campus:', error.message);
      toast.error(error.message || 'Lấy thông tin campus thất bại');
    },
    select: (response) => {
      return response;
    },
  });
};

export default useGetCampusById;