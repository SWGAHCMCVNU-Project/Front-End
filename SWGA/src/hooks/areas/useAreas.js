import { useQuery } from "@tanstack/react-query";
import { getAreasAPI } from "../../store/api/areasApi";
import { toast } from "react-hot-toast";

export function useAreas({ page = 1, size = 10, search = "", isAsc = true } = {}) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["areas", page, size, search, isAsc],
    queryFn: () => getAreasAPI({ page, size, search, isAsc }), // Remove state filter
    staleTime: 1000 * 60,
    keepPreviousData: true,
    onError: () => toast.error("Không thể tải danh sách khu vực"),
  });

  const areas = data?.data
    ? {
        result: data.data.items || [],
        currentPage: data.data.page || page,
        pageSize: data.data.size || size,
        pageCount: data.data.totalPages || 0,
        totalCount: data.data.total || 0,
      }
    : {
        result: [],
        currentPage: page,
        pageSize: size,
        pageCount: 0,
        totalCount: 0,
      };

  return { isLoading, areas, error };
}
