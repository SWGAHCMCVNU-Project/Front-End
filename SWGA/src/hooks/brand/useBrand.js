// src/hooks/brand/useBrand.js
import { useQuery } from '@tanstack/react-query';
import { getBrandByAccountIdAPI } from '../../store/api/brandApi'; // Import trực tiếp từ brandApi.js

export function useBrand() {
  const {
    isLoading,
    data: brand,
    error,
  } = useQuery({
    queryKey: ['brand'],
    queryFn: getBrandByAccountIdAPI, // Gọi hàm trực tiếp, không cần .getBrandByAccountId()
    staleTime: 1000 * 60 * 5, // 5 phút
  });

  return { isLoading, error, brand };
}