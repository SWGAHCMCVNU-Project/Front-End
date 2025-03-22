import { useQuery } from "@tanstack/react-query";
import { getAllPointPackages } from "../../store/api/pointPackageApi";
import { toast } from "react-hot-toast";

export const usePointPackages = ({
  page = 1,
  size = 10,
  searchName = "",
  isAsc = true,
  status,
} = {}) => {
  const params = {
    page,
    size,
    searchName,
    isAsc,
    status: status || null,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["pointPackages", page, size, searchName, isAsc, status],
    queryFn: () => getAllPointPackages(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải danh sách gói điểm"),
  });

  const pointPackages = data?.data?.items || [];
  const totalCount = data?.data?.total || 0;
  const totalPages = data?.data?.totalPages || 0;

  return {
    pointPackages,
    totalCount,
    totalPages,
    error,
    isLoading,
  };
}; 