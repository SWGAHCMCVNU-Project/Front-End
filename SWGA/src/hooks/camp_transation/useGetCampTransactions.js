import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCampTransactions } from "../../store/api/campTransactionApi";

export function useGetCampTransactions({ brandId, page, size }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["campaignTransactions", brandId, page, size],
    queryFn: async () => {
      const response = await getCampTransactions({ brandId, page, size });
      return response;
    },
    enabled: !!brandId, // Only run query if brandId exists
    retry: 1,
    
    staleTime: 0,
    cacheTime: 0,
    onError: (error) => {
      console.error("Error fetching camp transactions:", error.message);
    },
  });

  const refetchTransactions = () => {
    queryClient.invalidateQueries([
      "campaignTransactions",
      brandId,
      page,
      size,
    ]);
  };

  return {
    ...query,
    refetchTransactions,
  };
}
