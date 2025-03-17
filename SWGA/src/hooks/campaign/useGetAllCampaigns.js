import { useQuery } from '@tanstack/react-query';
import { getAllCampaignsAPI } from '../../store/api/campaignApi';

const useGetAllCampaigns = ({ sort, search, page, size, brandIds, campaignTypeIds, statesFilterValue }) => {
  let formattedStates = statesFilterValue;
  if (statesFilterValue === "3,4") {
    formattedStates = "3,4";
  } else if (statesFilterValue === undefined) {
    formattedStates = null;
  }

  console.log('Params in useGetAllCampaigns:', { sort, searchName: search, page, size, brandIds, campaignTypeIds, statesFilterValue: formattedStates });

  return useQuery({
    queryKey: ['campaigns', { sort, search, page, size, brandIds, campaignTypeIds, statesFilterValue }],
    queryFn: () => getAllCampaignsAPI({
      sort,
      searchName: search,
      page,
      size,
      brandIds,
      campaignTypeIds,
      statesFilterValue: formattedStates
    }),
    onError: (error) => {
      console.error('Error fetching all campaigns:', error);
    },
    keepPreviousData: false, // Tắt cache để debug
  });
};

export default useGetAllCampaigns;