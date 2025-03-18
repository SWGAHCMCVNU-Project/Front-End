import { useQuery } from '@tanstack/react-query';
import { getCampaignByIdAPI } from '../../store/api/campaignApi';

const useGetCampaignById = (id, params = {}) => {
    const { state, sort, search, page, limit, brandsFilterValue, areasFilterValue } = params;

    return useQuery({
        queryKey: ['campaign', id, { state, sort, search, page, limit, brandsFilterValue, areasFilterValue }],
        queryFn: () => getCampaignByIdAPI(id, params),
        enabled: !!id,
        onError: (error) => {
            console.error(`Error fetching campaign with ID ${id}:`, error);
        },
    });
};

export default useGetCampaignById;