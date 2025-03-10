import { useQuery } from '@tanstack/react-query';
import brandService from '../../services/brandService';

export function useBrand() {
  const {
    isLoading,
    data: brand,
    error,
  } = useQuery({
    queryKey: ['brand'],
    queryFn: () => brandService.getBrandByAccountId(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return { isLoading, error, brand };
} 