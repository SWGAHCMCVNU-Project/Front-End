import { useQuery } from "@tanstack/react-query";
import { getAllCampaignTypes } from "../../store/api/campaignTypeAPI";
import { toast } from "react-hot-toast";

export const useCampaignTypes = ({
  page = 1,
  size = 10,
  searchName = "",
  isAsc = true,
  state,
} = {}) => {
  const params = {
    page,
    size,
    searchName,
    isAsc,
    state: state || null,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["campaignTypes", page, size, searchName, isAsc, state],
    queryFn: () => getAllCampaignTypes(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải danh sách loại chiến dịch"),
  });

  const campaignTypes = data?.data?.items || [];
  const totalCount = data?.data?.total || 0;
  const totalPages = data?.data?.totalPages || 0;

  return {
    campaignTypes,
    totalCount,
    totalPages,
    error,
    isLoading,
  };
};