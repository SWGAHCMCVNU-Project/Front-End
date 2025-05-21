import { useQuery } from '@tanstack/react-query';
import { getCampaignRankingByBrandAPI } from "../../store/api/campaignApi";

export const useCampaignRankingByBrand = (brandId, options = {}) => {
  return useQuery({
    queryKey: ['campaignRankingByBrand', brandId],
    queryFn: () => getCampaignRankingByBrandAPI(brandId, options),
    enabled: !!brandId,
    ...options,
  });
};