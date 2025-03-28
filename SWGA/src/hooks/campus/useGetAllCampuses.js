// store/hooks/useGetAllCampuses.js
import { useQuery } from '@tanstack/react-query';
import { getAllCampusesAPI } from '../../store/api/campusApi';
import toast from 'react-hot-toast';

// Hook to fetch all campuses
const useGetAllCampuses = ({ searchName = "", page = 1, size = 10 } = {}) => {
  return useQuery({
    queryKey: ['campuses', searchName, page, size],
    queryFn: async () => {
      const response = await getAllCampusesAPI({ searchName, page, size });
      console.log("useGetAllCampuses Response:", response); // Kiểm tra dữ liệu từ API
      return response;
    },
    onError: (error) => {
      console.error('Error fetching campuses:', error.message);
      toast.error(error.message || 'Lấy danh sách campus thất bại');
    },
  });
};
export default useGetAllCampuses;