// useCreateCampaign.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCampaignAPI } from '../../store/api/campaignApi';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createCampaignAPI,
    onSuccess: () => {
      // Invalidate query to refresh the campaigns list after creation
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      
      // Dispatch wallet balance update event
      const event = new Event('walletBalanceUpdated');
      window.dispatchEvent(event);

      // Show success message and navigate
      message.success("Tạo thành công chiến dịch!", 1);
      navigate("/campaigns", { replace: true });
    },
    onError: (error) => {
      console.error('Error creating campaign:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error(`Tạo chiến dịch thất bại: ${error?.message || "Lỗi không xác định"}`);
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