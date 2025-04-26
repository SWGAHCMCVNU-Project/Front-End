import { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { useGetVoucherItemsByCampaignId } from "../../../hooks/campaignDetail/useGetVoucherItemsByCampaignId";
import useGetCampaignById from "../../../hooks/campaign/useGetCampaignById";
import useGetVouchersByCampaignId from "../../../hooks/campaignDetail/useGetVouchersByCampaignId";

export function useCampaignVoucherItem() {
    return useContext(PaginationContext);
}

export function CampaignVoucherItemProvider({ children }) {
    const { campaignId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, handlePageChange: baseHandlePageChange } = useTablePagination(1, 10);
    const [pageSize, setPageSize] = useState(10); // Mặc định 10 items mỗi trang
    const [isLocked, setIsLocked] = useState(null);
    const [isBought, setIsBought] = useState(null);
    const [isUsed, setIsUsed] = useState(null);
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const [voucherGroups, setVoucherGroups] = useState({});
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const search = searchParams.get("search") || "";
    const { data: campaign } = useGetCampaignById(campaignId);
    const campaignDetailIds = campaign?.campaignDetailId || [];
    const { vouchers } = useGetVouchersByCampaignId(campaignId);

    const {
        voucherItems: campaignVoucherItems,
        isLoading: isLoadingItems,
        error: itemsError,
        pagination: apiPagination
    } = useGetVoucherItemsByCampaignId(campaignDetailIds, search, page, pageSize, {
        isBought,
        isUsed,
        isLocked,
    });

    // Tạo voucher groups khi campaignVoucherItems hoặc vouchers thay đổi
    useEffect(() => {
        if (!campaignVoucherItems || !vouchers) return;

        const groups = campaignVoucherItems.reduce((acc, item) => {
            const voucherId = item.voucherId;
            if (!acc[voucherId]) {
                const voucherInfo = vouchers.find(v => v.id === voucherId) || {};
                acc[voucherId] = {
                    items: [],
                    voucher: voucherInfo
                };
            }
            acc[voucherId].items.push(item);
            return acc;
        }, {});

        setVoucherGroups(groups);

        if (!selectedVoucherId && Object.keys(groups).length > 0) {
            const firstVoucherId = Object.keys(groups)[0];
            setSelectedVoucherId(firstVoucherId);
            setSelectedVoucher(groups[firstVoucherId].voucher);
        } else if (selectedVoucherId && groups[selectedVoucherId]) {
            setSelectedVoucher(groups[selectedVoucherId].voucher);
        }
    }, [campaignVoucherItems, vouchers]);

    const handlePageChange = (newPage) => {
        const maxPage = apiPagination?.totalPages || 1;
        const validPage = Math.min(Math.max(1, newPage), maxPage);

        if (validPage === 1) {
            searchParams.delete("page");
        } else {
            searchParams.set("page", validPage);
        }
        setSearchParams(searchParams);
        baseHandlePageChange(validPage);
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        handlePageChange(1); // Reset về trang 1 khi thay đổi pageSize
        if (size === 10) {
            searchParams.delete("pageSize");
        } else {
            searchParams.set("pageSize", size);
        }
        setSearchParams(searchParams);
    };

    const value = {
        isLoading: isLoadingItems,
        error: itemsError,
        campaignVoucherItems,
        pagination: apiPagination,
        page,
        pageSize, // Thêm pageSize vào context
        handlePageChange,
        handlePageSizeChange, // Thêm handlePageSizeChange vào context
        isLocked,
        setIsLocked,
        isBought,
        setIsBought,
        isUsed,
        setIsUsed,
        selectedVoucher,
        voucherGroups,
        selectedVoucherId,
        setSelectedVoucherId
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}

CampaignVoucherItemProvider.propTypes = {
    children: PropTypes.node.isRequired,
};