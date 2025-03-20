// useCreateCampaign.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCampaignAPI } from '../../store/api/campaignApi';

const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCampaignAPI,
    onSuccess: () => {
      // Invalidate query để làm mới danh sách campaigns sau khi tạo
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
    onError: (error) => {
      console.error('Error creating campaign:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    },
  });

  return {
    mutate: mutation.mutate,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useCreateCampaign;