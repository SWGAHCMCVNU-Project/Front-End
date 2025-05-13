import { useQuery } from "@tanstack/react-query";
import { getCampaignsByBrandIdAPI } from "../../store/api/campaignApi";

const useCampaignsByBrandId = (brandId, initialParams = { page: 1, size: 100, searchName: "" }) => {
  // Define the query key for caching and refetching
  const queryKey = ["campaigns", brandId, initialParams.page, initialParams.size, initialParams.searchName];

  // Define the query function
  const fetchCampaigns = async () => {
    if (!brandId) {
      return { items: [], page: initialParams.page, totalPages: 1, total: 0 };
    }
    const response = await getCampaignsByBrandIdAPI(brandId, initialParams);
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch campaigns");
    }
    return response.data;
  };

  // Use TanStack Query's useQuery hook
  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: fetchCampaigns,
    enabled: !!brandId, // Only fetch if brandId exists
    retry: 1, // Retry once on failure
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  });

  // Process the data
  const campaigns = Array.isArray(data?.items) ? data.items : [];
  const pagination = {
    currentPage: data?.page || initialParams.page,
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || campaigns.length,
  };

  // Custom refetch function to allow updating parameters
  const customRefetch = (newParams) => {
    const updatedParams = { ...initialParams, ...newParams };
    refetch({ queryKey: ["campaigns", brandId, updatedParams.page, updatedParams.size, updatedParams.searchName] });
  };

  return {
    campaigns,
    loading: isLoading,
    error: error ? error.message : null,
    pagination,
    refetch: customRefetch,
  };
};

export default useCampaignsByBrandId;