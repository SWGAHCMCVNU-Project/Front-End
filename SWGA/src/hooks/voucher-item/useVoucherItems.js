import { useQuery } from '@tanstack/react-query';
import { getVoucherItemsAPI } from '../../store/api/voucherItemApi';

export function useVoucherItems(page, size) {
  const {
    isLoading,
    data: voucherItems,
    error,
  } = useQuery({
    queryKey: ['voucherItems', page, size],
    queryFn: () => getVoucherItemsAPI({ page, size }),
  });

  return { isLoading, error, voucherItems };
} 