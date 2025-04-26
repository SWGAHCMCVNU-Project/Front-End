import { useQuery } from "@tanstack/react-query";
import { getVoucherItemsByCampaignId } from "../../store/api/campaignDetailApi";

export function useGetVoucherItemsByCampaignId(campaignDetailId, searchName = "", page = 1, size = 10, { isBought = null, isUsed = null, isLocked = null } = {}) {
    const validPage = Math.max(1, page);

    const {
        isLoading,
        data: { items = [], total = 0 } = {},
        error,
    } = useQuery({
        queryKey: ["voucherItems", campaignDetailId, searchName, validPage, size, isBought, isUsed, isLocked],
        queryFn: () => getVoucherItemsByCampaignId({
            campaignDetailId,
            search: searchName,
            page: validPage,
            limit: size,
            isBought,
            isUsed,
            isLocked,
        }),
        enabled: !!campaignDetailId,
        keepPreviousData: true,
    });

    const actualTotalPages = Math.max(1, Math.ceil(total / size));
    const actualPage = Math.min(validPage, actualTotalPages);

    return {
        voucherItems: items,
        isLoading,
        error,
        pagination: {
            total,
            currentPage: actualPage,
            totalPages: actualTotalPages,
            hasNextPage: actualPage < actualTotalPages,
            hasPrevPage: actualPage > 1
        },
    };
}