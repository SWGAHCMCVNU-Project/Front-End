import { useQuery } from '@tanstack/react-query';
import { getCampaignRankingBrand } from '../../store/api/rankingApi';

// Hook để lấy xếp hạng chiến dịch (brand)
export const useCampaignRankingBrand = (id) => {
  return useQuery({
    queryKey: ['campaignRankingBrand', id],
    queryFn: () => getCampaignRankingBrand(id),
    enabled: !!id,
  });
};