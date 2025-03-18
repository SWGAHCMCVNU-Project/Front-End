// hooks/campaign-type/useUpdateCampaignType.js
import { useMutation } from "@tanstack/react-query";
import { updateCampaignType } from "../../store/api/campaignTypeAPI"; // Correct import path

export const useUpdateCampaignType = () => {
  const { mutate: updateCampaignTypeFn, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, typeName, description, image, state, status }) =>
      updateCampaignType(id, { typeName, description, image, state, status }),
  });

  return { updateCampaignType: updateCampaignTypeFn, isUpdating };
};