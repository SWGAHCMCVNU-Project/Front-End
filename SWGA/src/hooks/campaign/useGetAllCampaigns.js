import { useQuery } from "@tanstack/react-query";
import { getAllCampaignsAPI } from "../../store/api/campaignApi";
import { toast } from "react-hot-toast";

const useGetAllCampaigns = ({
  sort,
  search,
  page,
  size,
  campaignTypeIds,
  statesFilterValue,
} = {}) => {
  const params = {
    sort,
    searchName: search,
    page,
    limit: size,
    campaignTypeIds,
    statesFilterValue:
      statesFilterValue === "3,4" ? "3,4" : statesFilterValue || null,
  };

  const queryResult = useQuery({
    queryKey: [
      "campaigns",
      sort,
      search,
      page,
      size,
      campaignTypeIds?.join(","),
      params.statesFilterValue,
    ],
    queryFn: async () => {
      const response = await getAllCampaignsAPI(params);
      return response;
    },
    staleTime: 1000 * 60,
    onError: (error) => {
      console.error("Error fetching campaigns:", error);
      toast.error("Không thể tải danh sách chiến dịch");
    },
    keepPreviousData: true,
  });

  // Handle different response formats
  const totalCampaigns =
    queryResult.data?.total ||
    queryResult.data?.data?.total ||
    queryResult.data?.totalCount ||
    0;

  return {
    ...queryResult,
    totalCampaigns,
  };
};

export default useGetAllCampaigns;