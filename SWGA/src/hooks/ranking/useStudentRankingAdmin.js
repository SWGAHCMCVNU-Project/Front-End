import { useQuery } from '@tanstack/react-query';
import { getStudentRankingAdmin } from '../../store/api/rankingApi';

// Hook để lấy xếp hạng sinh viên (admin)
export const useStudentRankingAdmin = (id) => {
  return useQuery({
    queryKey: ['studentRankingAdmin', id],
    queryFn: () => getStudentRankingAdmin(id),
    enabled: !!id, // Chỉ chạy query nếu id tồn tại
  });
};