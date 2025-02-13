// import { useQuery } from "@tanstack/react-query";
// import { getCampaignTypeFilter } from "../../store/api/apiCampaignType";

// export function useFilterCampaignType() {

//     const {
//         isLoading,
//         data: campaignTypes,
//         error
//     } = useQuery({
//         queryKey: ["campaignTypeFilter"],
//         queryFn: () => getCampaignTypeFilter()
//     });

//     return { isLoading, campaignTypes, error };
// }
import { mockCampaignTypes } from "./CampaignPage/mockData";

export function useFilterCampaignType() {
    const isLoading = false;
    const error = null;
    
    // Sử dụng mock data
    const campaignTypes = mockCampaignTypes;

    return { isLoading, campaignTypes, error };
}