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
  brandId,
  enabled = true,
} = {}) => {
  const params = {
    sort,
    searchName: search,
    page,
    limit: size,
    campaignTypeIds,
    brandId,
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
      brandId,
    ],
    queryFn: () => getAllCampaignsAPI(params),
    enabled,
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải danh sách chiến dịch"),
    keepPreviousData: true,
  });

  return queryResult;
};

export default useGetAllCampaigns;
