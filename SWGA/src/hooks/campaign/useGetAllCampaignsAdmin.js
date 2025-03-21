import { useQuery } from "@tanstack/react-query";
import { getAllCampaignsAdminAPI } from "../../store/api/campaignApi";

import { toast } from "react-hot-toast";

const useGetAllCampaignsAdmin = ({ sort, search, page, size, enabled = true } = {}) => {
  const params = {
    sort,
    searchName: search,
    page,
    limit: size,
  };

  const queryResult = useQuery({
    queryKey: ["campaigns", sort, search, page, size],
    queryFn: () => getAllCampaignsAdminAPI(params),
    enabled,
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải danh sách chiến dịch"),
    keepPreviousData: true,
  });

  return queryResult;
};

export default useGetAllCampaignsAdmin;
