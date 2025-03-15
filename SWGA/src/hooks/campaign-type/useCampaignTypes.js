// hooks/campaign-type/useCampaignTypes.js
import { useQuery } from "@tanstack/react-query";
import { getAllCampaignTypes } from  "../../store/api/campaignTypeAPI";

export const useCampaignTypes = ({ page, size, searchName, isAsc, state }) => { // Changed search to searchName
  const { data, error, isLoading } = useQuery({
    queryKey: ["campaignTypes", page, size, searchName, isAsc, state],
    queryFn: () => getAllCampaignTypes({ page, size, searchName, isAsc, state }), // Changed search to searchName
    keepPreviousData: true,
  });

  return {
    campaignTypes: data,
    error,
    isLoading,
  };
};