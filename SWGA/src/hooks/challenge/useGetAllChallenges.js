import { useQuery } from "@tanstack/react-query";
import { getAllChallenges } from "../../store/api/challengeApi";

// Hook to fetch all challenges using react-query
export const useGetAllChallenges = (params = {}) => {
  const { page = 1, size = 10, search = "", status = null } = params;

  const queryKey = ["challenges", page, size, search, status];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getAllChallenges({ page, size, search, status });
      return response;
    },
    keepPreviousData: true, // Giữ dữ liệu cũ trong khi fetching để tránh nhấp nháy giao diện
  });

  return {
    challenges: data?.items || [],
    totalCount: data?.total || 0,
    loading: isLoading,
    error,
  };
};