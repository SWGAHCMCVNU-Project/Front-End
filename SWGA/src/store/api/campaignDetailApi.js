import apiClient from './apiClient';
import { CAMPAIGN_DETAIL_ENDPOINTS, CAMPAIGN_ENDPOINTS } from './endpoints';

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

export const getStoresByCampaignId = async (campaignId, searchName = "", page = 1, size = 10) => {
    try {
        console.log('Calling API with params:', {
            campaignId,
            searchName,
            page,
            size
        });

        const response = await apiClient.get(
            CAMPAIGN_ENDPOINTS.GET_STORE_BY_ID.replace("{id}", campaignId),
            {
                params: {
                    searchName,
                    page,
                    size,
                },
            }
        );

        console.log('Raw Response Data:', response.data);

        // Kiểm tra nếu response.data là null hoặc undefined
        if (!response.data) {
            console.warn('API returned null/undefined data for campaignId:', campaignId);
            return {
                items: [],
                total: 0,
                page: 1,
                totalPages: 0
            };
        }

        // Format lại dữ liệu store từ response
        const items = response.data.items || response.data;
        const formattedItems = Array.isArray(items) ? items.map(item => ({
            id: item.store?.id || '',
            storeName: item.store?.storeName || 'Cửa hàng không tên',
            brandName: item.store?.brand?.brandName || 'Thương hiệu không rõ',
            avatar: item.store?.file || '',
            email: item.store?.account?.email || 'Chưa cập nhật',
            phone: item.store?.account?.phoneNumber || 'Chưa cập nhật',
            address: item.store?.address || 'Chưa cập nhật',
            openingHours: item.store?.openingHours || '00:00',
            closingHours: item.store?.closingHours || '00:00',
            state: item.store?.state || false,
            status: item.status || false,
            campaignStoreId: item.id || ''
        })) : [];

        console.log('Formatted Items:', formattedItems);

        const result = {
            items: formattedItems,
            total: response.data.total || formattedItems.length,
            page: response.data.page || page,
            totalPages: response.data.totalPages || Math.ceil(formattedItems.length / size)
        };

        console.log('Final Result:', result);
        return result;
    } catch (error) {
        console.error("Error fetching campaign stores:", {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        throw error;
    }
};