import { useQuery } from "@tanstack/react-query";
import { getVoucherTypesAPI } from "../../store/api/voucherTypeApi";

export function useVoucherTypes() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["voucherTypes"],
    queryFn: getVoucherTypesAPI,
    select: (response) => {
      console.log('Response in useVoucherTypes:', response);
      if (response?.status === 200 && Array.isArray(response.data)) {
        console.log('Returning data:', response.data);
        return response.data;
      }
      console.log('No valid data found, returning empty array');
      return [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  console.log('Hook return value:', { isLoading, error, data });
  return { isLoading, error, voucherTypes: data };
}