import { useQuery } from "@tanstack/react-query";
import { getAllCampaignTypes } from "../../store/api/campaignTypeAPI";
import { toast } from "react-hot-toast";

export const useCampaignTypes = ({ page = 1, size = 100, searchName = "", isAsc = true, state } = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["campaignTypes", page, size, searchName, isAsc, state],
    queryFn: () => getAllCampaignTypes({ page, size, searchName, isAsc, state }),
    keepPreviousData: true,
    onError: () => toast.error("Không thể tải danh sách loại chiến dịch"),
  });

  const campaignTypes = data?.data?.items || [];

  return {
    campaignTypes,
    error,
    isLoading,
  };
};