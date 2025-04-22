import { useQuery } from '@tanstack/react-query';
import { getPurchaseHistory } from '../../store/api/buyPointApi';

// Hook to fetch purchase history using TanStack Query
export const useGetPurchaseHistory = (options = {}) => {
  return useQuery({
    queryKey: ['purchaseHistory', options],
    queryFn: () => getPurchaseHistory(options),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
    retry: 1, // Retry once on failure
    onError: (error) => {
      console.error('Failed to fetch purchase history:', error);
    },
  });
};