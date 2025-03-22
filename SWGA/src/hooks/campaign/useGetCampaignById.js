import { useQuery } from '@tanstack/react-query';
import { getCampaignByIdAPI } from '../../store/api/campaignApi';

const useGetCampaignById = (id) => {
    return useQuery({
        queryKey: ['campaign', id],
        queryFn: () => getCampaignByIdAPI(id),
        enabled: !!id,
        select: (data) => ({
            ...data,
            campaignDetailIds: data.campaignDetailId || []
        }),
        onError: (error) => {
            console.error(`Error fetching campaign with ID ${id}:`, error);
        },
    });
};

export default useGetCampaignById;