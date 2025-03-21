import { useQuery } from "@tanstack/react-query";
import { getAllCampaignsAPI } from "../../store/api/campaignApi";
// import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";

const useGetAllCampaigns = ({ 
  sort, 
  search, 
  page, 
  size, 
  campaignTypeIds, 
  statesFilterValue 
} = {}) => {
  // const { brand } = useBrand();
  // const brandId = brand?.id; // Lấy brandId từ useBrand

  const params = {
    sort,
    searchName: search,
    page,
    limit: size,
    campaignTypeIds,
    statesFilterValue: statesFilterValue === "3,4" ? "3,4" : statesFilterValue || null,
    // ...(brandId && { brandId }), // Chỉ thêm brandId nếu có
  };

  const queryResult = useQuery({
    queryKey: ["campaigns", sort, search, page, size,  campaignTypeIds?.join(","), params.statesFilterValue],
    queryFn: () => getAllCampaignsAPI(params),
    // enabled: !!brandId, // Chỉ gọi API nếu có brandId
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải danh sách chiến dịch"),
    keepPreviousData: true,
  });

  return queryResult;
};

export default useGetAllCampaigns;
