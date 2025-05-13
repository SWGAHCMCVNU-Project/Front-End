// hooks/campaign-type/useCreateCampaignType.js
import { useMutation } from "@tanstack/react-query";
import { createCampaignType } from "../../store/api/campaignTypeAPI";

export const useCreateCampaignType = () => {
  const { mutate: createCampaignTypeFn, isLoading: isCreating } = useMutation({
    mutationFn: ({ typeName, description, image, state, duration, coin }) =>
      createCampaignType({ typeName, description, image, state, duration, coin }),
  });

  return { createCampaignType: createCampaignTypeFn, isCreating };
};