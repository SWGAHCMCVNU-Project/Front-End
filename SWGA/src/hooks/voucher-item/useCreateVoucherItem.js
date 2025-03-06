import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVoucherItemAPI } from '../../store/api/voucherItemApi';
import toast from 'react-hot-toast';

export function useCreateVoucherItem() {
  const queryClient = useQueryClient();

  const { mutate: createVoucherItem, isLoading: isCreating } = useMutation({
    mutationFn: createVoucherItemAPI,
    onSuccess: () => {
      toast.success('Tạo voucher item thành công');
      queryClient.invalidateQueries({ queryKey: ['voucherItems'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Có lỗi xảy ra khi tạo voucher item');
    },
  });

  return { isCreating, createVoucherItem };
} 