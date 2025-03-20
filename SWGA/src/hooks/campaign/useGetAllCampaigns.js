import { useQuery } from '@tanstack/react-query';
import { getAllCampaignsAPI } from '../../store/api/campaignApi';
import StorageService from '../../services/storageService';

const useGetAllCampaigns = ({ 
  sort, 
  search, 
  page, 
  size, 
  brandId: providedBrandId, // Đổi tên để tránh xung đột
  campaignTypeIds, 
  statesFilterValue 
} = {}) => {
  // Nếu brandId không được truyền qua tham số, lấy từ StorageService
  const brandId = providedBrandId || StorageService.getBrandId();
  console.log('🔍 brandId (sau khi lấy từ tham số hoặc StorageService):', brandId);

  if (!brandId) {
    console.error('brandId is null or undefined, cannot fetch campaigns');
    return { 
      data: null, 
      isLoading: false, 
      error: new Error('brandId is missing. Please ensure you are logged in and brandId is set in storage.') 
    };
  }

  let formattedStates = statesFilterValue;
  if (statesFilterValue === "3,4") {
    formattedStates = "3,4";
  } else if (statesFilterValue === undefined) {
    formattedStates = null;
  }

  console.log('🔍 Params in useGetAllCampaigns:', { 
    sort, 
    searchName: search, 
    page, 
    size, 
    brandId, 
    campaignTypeIds, 
    statesFilterValue: formattedStates 
  });

  const queryResult = useQuery({
    queryKey: ['campaigns', sort, search, page, size, brandId, campaignTypeIds?.join(','), formattedStates],
    queryFn: () => getAllCampaignsAPI({
      sort,
      searchName: search,
      page,
      limit: size,
      brandId,
      campaignTypeIds,
      statesFilterValue: formattedStates
    }),
    enabled: !!brandId, // Chỉ fetch khi brandId có giá trị
    onError: (error) => {
      console.error('Error fetching all campaigns:', error);
    },
    keepPreviousData: true,
  });

  return queryResult;
};

export default useGetAllCampaigns;