import apiClient from './apiClient';
import { CAMPAIGN_DETAIL_ENDPOINTS } from './endpoints';

export const getVouchersByCampaignId = async (campaignId, searchName = "", page = 1, size = 10) => {
    try {
        const response = await apiClient.get(CAMPAIGN_DETAIL_ENDPOINTS.GET_VOUCHER, {
            params: {
                searchName,
                page,
                size,
            },
        });

        // Log để kiểm tra dữ liệu từ API
        console.log("API Response Data:", response.data);

        // Kiểm tra và lấy mảng dữ liệu từ response
        let vouchersData = response.data.items || response.data.data || response.data.result || [response.data];

        // Đảm bảo vouchersData là mảng
        if (!Array.isArray(vouchersData)) {
            console.warn('Expected an array from API, got:', vouchersData);
            vouchersData = [];
        }

        // Log campaignId để debug
        console.log("Filtering with campaignId:", campaignId);

        // Lọc danh sách trả về để chỉ lấy các vouchers thuộc campaignId đó
        const vouchers = vouchersData.filter(
            (item) => item.campaignId === campaignId
        );

        // Log để kiểm tra vouchers sau khi lọc
        console.log("Filtered Vouchers:", vouchers);

        return vouchers;
    } catch (error) {
        console.error("Error fetching vouchers by campaign ID:", error);
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
        console.error("Error fetching voucher detail by ID:", error);
        throw error;
    }
};