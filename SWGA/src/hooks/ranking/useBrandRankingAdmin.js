import { useQuery } from '@tanstack/react-query';
import { getBrandRankingAdmin } from '../../store/api/rankingApi';

// Hook để lấy xếp hạng thương hiệu (admin)
export const useBrandRankingAdmin = (id) => {
  return useQuery({
    queryKey: ['brandRankingAdmin', id],
    queryFn: () => getBrandRankingAdmin(id),
    enabled: !!id,
  });
};