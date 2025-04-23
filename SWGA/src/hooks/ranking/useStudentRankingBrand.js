import { useQuery } from '@tanstack/react-query';
import { getStudentRankingBrand } from '../../store/api/rankingApi';

// Hook để lấy xếp hạng sinh viên theo thương hiệu
export const useStudentRankingBrand = (id) => {
  return useQuery({
    queryKey: ['studentRankingBrand', id],
    queryFn: () => getStudentRankingBrand(id),
    enabled: !!id,
  });
};