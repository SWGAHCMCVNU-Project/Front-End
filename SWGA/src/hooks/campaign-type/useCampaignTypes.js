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
    page: Number(page) || 1,
    size: Number(size) || 10,
    searchName: searchName || "",
    isAsc: Boolean(isAsc),
    state: state !== undefined ? Boolean(state) : null,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["campaignTypes", page, size, searchName, isAsc, state],
    queryFn: () => getAllCampaignTypes(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải danh sách loại chiến dịch"),
  });

  // Trả về dữ liệu trực tiếp từ API mà không ánh xạ lại
  return {
    campaignTypes: data, // Trả về toàn bộ object từ getAllCampaignTypes
    error,
    isLoading,
  };
};