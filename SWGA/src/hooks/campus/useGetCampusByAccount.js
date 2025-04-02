import { useQuery } from '@tanstack/react-query';
import { getCampusByAccountIdAPI } from '../../store/api/campusApi';
import toast from 'react-hot-toast';

const useGetCampusByAccountId = (accountId) => {
  return useQuery({
    queryKey: ['campusByAccount', accountId],
    queryFn: () => getCampusByAccountIdAPI(accountId),
    enabled: !!accountId, // Chỉ chạy query nếu có accountId
    onError: (error) => {
      console.error('Error fetching campus by accountId:', error.message);
      toast.error(error.message || 'Lấy thông tin campus theo account thất bại');
    },
    select: (response) => {
      return response;
    },
  });
};

export default useGetCampusByAccountId;