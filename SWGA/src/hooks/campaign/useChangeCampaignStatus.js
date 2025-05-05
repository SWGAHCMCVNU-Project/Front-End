import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeCampaignStatusAPI } from '../../store/api/campaignApi';
import { getVouchersByCampaignId } from '../../store/api/campaignDetailApi';
import toast from 'react-hot-toast';

export const useChangeCampaignStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, status, file: rejectionReason }) => {
      const isApproved = status === 1;
      
      // Tính toán tổng số điểm cần hoàn trả nếu từ chối
      let totalRefund = 0;
      if (status === 3) {
        const vouchersData = await getVouchersByCampaignId(campaignId);
        totalRefund = vouchersData.items?.reduce((sum, voucher) => 
          sum + (voucher.price * voucher.numberOfItems), 0) || 0;
      }

      // Gọi API thay đổi trạng thái (backend sẽ tự động xử lý hoàn tiền)
      const response = await changeCampaignStatusAPI({ 
        campaignId, 
        isApproved, 
        rejectionReason: status === 3 ? rejectionReason || '' : ''
      });

      // Thêm thông tin refund vào response để hiển thị
      return {
        ...response,
        refundAmount: status === 3 ? totalRefund : 0
      };
    },
    onSuccess: (data, variables) => {
      // Hiển thị thông báo hoàn tiền nếu có
      if (variables.status === 3 && data.refundAmount > 0) {
        toast.success(`Đã hoàn trả ${data.refundAmount} điểm về ví brand`);
      }
      
      // Cập nhật cache
      queryClient.invalidateQueries(['campaigns']);
      queryClient.invalidateQueries(['campaign', variables.campaignId]);
      queryClient.invalidateQueries(['walletBalance']); // Cập nhật số dư ví
    },
    onError: (error) => {
      console.error('Error changing campaign status:', error);
      throw error;
    },
  });
};