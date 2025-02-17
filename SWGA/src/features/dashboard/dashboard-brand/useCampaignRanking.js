// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../../services/storageService";
// import { getCampaignRanking } from "../../../store/api/apiDashboard";

// export function useCampaignRanking() {
//   const brandId = storageService.getLoginId();
//   const { isLoading, data: campaignRankingBrand } = useQuery({
//     queryFn: () => getCampaignRanking(brandId),
//     queryKey: ["campaignRankingBrand"],
//   });

//   return { isLoading, campaignRankingBrand };
// }
import { useQuery } from "@tanstack/react-query";
import { mockCampaignRanking } from './mockData';

export function useCampaignRanking() {
  const { isLoading, data: campaignRankingBrand } = useQuery({
    queryFn: () => Promise.resolve(mockCampaignRanking.result),
    queryKey: ["campaignRankingBrand"],
  });

  return { isLoading, campaignRankingBrand };
}