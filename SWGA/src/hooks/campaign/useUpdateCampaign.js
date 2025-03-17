import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCampaignAPI } from '../../store/api/campaignApi';

const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ campaignId, campaignData }) => {
      console.log("Data sent to updateCampaignAPI:", { campaignId, campaignData });
      return updateCampaignAPI(campaignId, campaignData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaign', variables.campaignId] });
    },
    onError: (error) => {
      console.error('Error updating campaign:', error);
    },
  });

  return {
    isLoading,
    editCampaign: mutate, // Đặt tên lại mutate thành editCampaign
  };
};

export default useUpdateCampaign;