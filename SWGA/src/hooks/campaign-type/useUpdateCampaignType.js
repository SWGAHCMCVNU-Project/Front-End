// hooks/campaign-type/useUpdateCampaignType.js
import { useMutation } from "@tanstack/react-query";
import { updateCampaignType } from "../../store/api/campaignTypeAPI";

export const useUpdateCampaignType = () => {
  const { mutate: updateCampaignTypeFn, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, typeName, description, image, state, status, duration, coin }) =>
      updateCampaignType(id, { typeName, description, image, state, status, duration, coin }),
  });

  return { updateCampaignType: updateCampaignTypeFn, isUpdating };
};