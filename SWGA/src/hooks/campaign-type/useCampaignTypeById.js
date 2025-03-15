// hooks/campaign-type/useCampaignTypeById.js
import { useQuery } from "@tanstack/react-query";
import { getCampaignTypeById } from "../../store/api/campaignTypeAPI";

export const useCampaignTypeById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["campaignType", id],
    queryFn: () => getCampaignTypeById(id),
    enabled: !!id, // Only run if id is provided
  });

  return {
    campaignType: data, // { status, data: { id, typeName, image, ... } }
    error,
    isLoading,
  };
};