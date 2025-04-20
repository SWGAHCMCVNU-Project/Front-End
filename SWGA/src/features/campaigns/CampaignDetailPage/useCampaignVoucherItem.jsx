import { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, handlePageChange: baseHandlePageChange } = useTablePagination(1, 10);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [isLocked, setIsLocked] = useState(null);
    const [isBought, setIsBought] = useState(null);
    const [isUsed, setIsUsed] = useState(null);
    const [showAll, setShowAll] = useState(true);
    const [sortedVoucherItems, setSortedVoucherItems] = useState([]);
    const [displayedVoucherItems, setDisplayedVoucherItems] = useState([]); // New state for paginated items
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const [voucherGroups, setVoucherGroups] = useState({});
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [statusCounts, setStatusCounts] = useState({
        available: 0,
        bought: 0,
        used: 0,
        total: 0
    });

    const search = searchParams.get("search") || "";
    const { data: campaign } = useGetCampaignById(campaignId);
    const campaignDetailIds = campaign?.campaignDetailId || [];
    const { vouchers } = useGetVouchersByCampaignId(campaignId);

    const {
        voucherItems: campaignVoucherItems,
        isLoading: isLoadingItems,
        error: itemsError,
        pagination
    } = useGetVoucherItemsByCampaignId(campaignDetailIds, search, page, 10);

    useEffect(() => {
        const maxPage = pagination?.totalPages || 1;
        if (page > maxPage) {
            navigate(`/campaigns/${campaignId}?page=1`);
            baseHandlePageChange(1);
        }
    }, [pagination?.totalPages, page, campaignId, navigate, baseHandlePageChange]);

    const handlePageChange = (newPage) => {
        const maxPage = pagination?.totalPages || 1;
        const validPage = Math.min(Math.max(1, newPage), maxPage);

        if (validPage === 1) {
            searchParams.delete("page");
        } else {
            searchParams.set("page", validPage);
        }
        setSearchParams(searchParams);
        baseHandlePageChange(validPage);
    };

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

        const currentItems = groups[selectedVoucherId]?.items || [];
        let filteredItems = [...currentItems];

        if (isBought === true && isUsed === true) {
            filteredItems = filteredItems.filter(item => item.status === "Đã sử dụng");
        } else if (isBought === true && isUsed === false) {
            filteredItems = filteredItems.filter(item => item.status === "Đã mua");
        } else if (isBought === false && isUsed === false) {
            filteredItems = filteredItems.filter(item => item.status === "Khả dụng");
        }

        let sorted = [...filteredItems];
        sorted.sort((a, b) => {
            if (a.id.startsWith('VI') && !b.id.startsWith('VI')) return -1;
            if (!b.id.startsWith('VI') && b.id.startsWith('VI')) return 1;
            return a.id.localeCompare(b.id);
        });

        setSortedVoucherItems(sorted);

        // Slice the sorted items for the current page
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedItems = sorted.slice(startIndex, endIndex);
        setDisplayedVoucherItems(paginatedItems);
    }, [campaignVoucherItems, selectedVoucherId, vouchers, isBought, isUsed, page]);

    const value = {
        isLoading: isLoadingItems,
        error: itemsError,
        campaignVoucherItems: displayedVoucherItems, // Use paginated items
        pagination: {
            currentPage: page,
            total: sortedVoucherItems.length, // Use the total from sorted items
            totalPages: Math.ceil(sortedVoucherItems.length / 10) || 1
        },
        state,
        setState,
        page,
        handlePageChange,
        sort,
        setSort,
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