import { useQuery } from '@tanstack/react-query';
import { getVoucherItemByIdAPI } from '../../store/api/voucherItemApi';

export function useVoucherItem(voucherItemId) {
  const {
    isLoading,
    data: voucherItem,
    error,
  } = useQuery({
    queryKey: ['voucherItem', voucherItemId],
    queryFn: () => getVoucherItemByIdAPI(voucherItemId),
    enabled: !!voucherItemId,
  });

  return { isLoading, error, voucherItem };
} 