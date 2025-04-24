import { useQuery } from '@tanstack/react-query';
import { getPurchaseHistory } from '../../store/api/buyPointApi';

// Hook to fetch purchase history using TanStack Query
export const useGetPurchaseHistory = ({ id, page = 1, size = 10 } = {}) => {
  return useQuery({
    queryKey: ['purchaseHistory', { id, page, size }],
    queryFn: () => getPurchaseHistory({ id, page, size }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    onError: (error) => {
      console.error('Failed to fetch purchase history:', error);
    },
  });
};