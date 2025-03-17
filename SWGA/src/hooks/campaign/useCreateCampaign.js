import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCampaignAPI } from '../../store/api/campaignApi';

const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCampaignAPI,
    onSuccess: () => {
      // Invalidate query để làm mới danh sách campaigns sau khi tạo
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
    onError: (error) => {
      console.error('Error creating campaign:', error);
    },
  });

  return { mutate, isCreating: isPending }; // Trả về mutate và isCreating
};

export default useCreateCampaign;