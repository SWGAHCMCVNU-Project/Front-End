import apiClient from './apiClient';
import { CAMPAIGN_DETAIL_ENDPOINTS } from './endpoints';

export const getVouchersByCampaignId = async (campaignId, searchName = "", page = 1, size = 10) => {
    try {
        const response = await apiClient.get(CAMPAIGN_DETAIL_ENDPOINTS.GET_VOUCHER, {
            params: {
                campaignId,
                searchName,
                page,
                size,
            },
        });

        let vouchersData = response.data?.items || response.data?.data || response.data;
        
        if (!Array.isArray(vouchersData)) {
            console.warn('Expected array data, converting:', typeof vouchersData);
            vouchersData = [vouchersData].filter(Boolean);
        }

        return vouchersData;
    } catch (error) {
        console.error("Error fetching vouchers:", error.message);
        throw error;
    }
};

export const getVoucherDetailById = async (id) => {
    try {
        const response = await apiClient.get(
            CAMPAIGN_DETAIL_ENDPOINTS.GET_VOUCHER_BY_ID.replace("{id}", id)
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching voucher detail:", error.message);
        throw error;
    }
};