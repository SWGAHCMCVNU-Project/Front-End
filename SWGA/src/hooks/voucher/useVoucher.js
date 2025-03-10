import { useQuery } from '@tanstack/react-query';
import { getVoucherByIdAPI } from '../../store/api/voucherApi';

export function useVoucher(voucherId) {
  const {
    isLoading,
    data: voucher,
    error,
  } = useQuery({
    queryKey: ['voucher', voucherId],
    queryFn: () => getVoucherByIdAPI(voucherId),
    enabled: !!voucherId,
  });

  return { isLoading, error, voucher };
}