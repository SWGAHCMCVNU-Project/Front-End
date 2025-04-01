// useGetAllCampuses.js
import { useQuery } from '@tanstack/react-query';
import { getAllCampusesAPI } from '../../store/api/campusApi';
import toast from 'react-hot-toast';

const useGetAllCampuses = ({ searchName = "", page = 1, size = 10 } = {}) => {
  const queryResult = useQuery({
    queryKey: ['campuses', searchName, page, size],
    queryFn: async () => {
      const response = await getAllCampusesAPI({ searchName, page, size });
      return response;
    },
    onError: (error) => {
      console.error('Error fetching campuses:', error.message);
      toast.error(error.message || 'Lấy danh sách campus thất bại');
    },
  });

  // Kiểm tra các format khác nhau của response
  const totalCampuses = queryResult.data?.total || queryResult.data?.data?.total || queryResult.data?.totalCount || 0;

  return {
    ...queryResult,
    totalCampuses // Thử các field khác nhau
  };
};

export default useGetAllCampuses;