// hooks/campaign-type/useCreateCampaignType.js
import { useMutation } from "@tanstack/react-query";
import { createCampaignType } from "../../store/api/campaignTypeAPI";

export const useCreateCampaignType = () => {
  const { mutate: createCampaignTypeFn, isLoading: isCreating } = useMutation({
    mutationFn: ({ typeName, description, image, state }) =>
      createCampaignType({ typeName, description, image, state }),
  });

  return { createCampaignType: createCampaignTypeFn, isCreating };
};