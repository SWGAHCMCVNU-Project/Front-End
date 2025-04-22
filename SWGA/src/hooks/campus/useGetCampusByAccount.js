import { useQuery } from '@tanstack/react-query';
import { getCampusByAccountIdAPI } from '../../store/api/campusApi';
import toast from 'react-hot-toast';

const useGetCampusByAccountId = (accountId) => {
  return useQuery({
    queryKey: ['campusByAccount', accountId],
    queryFn: () => getCampusByAccountIdAPI(accountId),
    enabled: !!accountId,
    onError: (error) => {
      console.error('Error fetching campus by accountId:', error.message);
      toast.error(error.message || 'Lấy thông tin campus theo account thất bại');
    },
    select: (response) => {
      console.log('Response in useGetCampusByAccountId:', response); // Debug response
      if (response?.success) {
        let campusId = null;
        if (Array.isArray(response.data)) {
          campusId = response.data[0]?.id || null;
        } else if (response.data?.id) {
          campusId = response.data.id;
        } else if (response.data?.data?.id) {
          campusId = response.data.data.id;
        }

        return {
          data: response.data,
          campusId,
        };
      }
      return { data: null, campusId: null };
    },
    retry: 1,
    // Tắt refetch tự động khi cửa sổ được focus hoặc kết nối mạng thay đổi
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // Giữ dữ liệu cũ trong cache lâu hơn (ví dụ: 5 phút)
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetCampusByAccountId;