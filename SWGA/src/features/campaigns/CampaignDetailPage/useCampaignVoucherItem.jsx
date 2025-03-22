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
    const { page, limit, handlePageChange: baseHandlePageChange } = useTablePagination(1, 10);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [isLocked, setIsLocked] = useState(null);
    const [isBought, setIsBought] = useState(null);
    const [isUsed, setIsUsed] = useState(null);
    const [sortedVoucherItems, setSortedVoucherItems] = useState([]);
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const [voucherGroups, setVoucherGroups] = useState({});
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const search = searchParams.get("search") || "";

    // Lấy thông tin campaign để có campaignDetailId
    const { data: campaign } = useGetCampaignById(campaignId);
    const campaignDetailIds = campaign?.campaignDetailId || [];

    // Lấy danh sách vouchers
    const { vouchers } = useGetVouchersByCampaignId(campaignId);

    const {
        voucherItems: campaignVoucherItems,
        isLoading: isLoadingItems,
        error: itemsError,
        pagination
    } = useGetVoucherItemsByCampaignId(campaignDetailIds, search, page, limit);

    // Kiểm tra và điều chỉnh page khi component mount hoặc khi pagination thay đổi
    useEffect(() => {
        const maxPage = Math.ceil((pagination?.total || 0) / limit);
        if (maxPage === 0) {
            // Nếu không có dữ liệu, luôn ở trang 1
            if (page !== 1) {
                navigate(`/campaigns/${campaignId}?page=1`);
                baseHandlePageChange(1);
            }
        } else if (page > maxPage) {
            // Nếu page vượt quá maxPage, redirect về page 1
            navigate(`/campaigns/${campaignId}?page=1`);
            baseHandlePageChange(1);
        }
    }, [pagination?.total, page, limit, campaignId]);

    // Custom handle page change để validate page number
    const handlePageChange = (newPage) => {
        // Check if we have enough items for pagination
        if (!campaignVoucherItems?.length || campaignVoucherItems.length <= 10) {
            return;
        }

        // Validate page number
        const maxPage = Math.ceil(campaignVoucherItems.length / limit) || 1;
        const validPage = Math.min(Math.max(1, newPage), maxPage);
        
        // Only update if page is valid and we have enough items
        if (validPage === 1) {
            searchParams.delete("page");
        } else {
            searchParams.set("page", validPage);
        }
        setSearchParams(searchParams);
    };

    // Group voucher items theo voucherId và sắp xếp
    useEffect(() => {
        if (!campaignVoucherItems || !vouchers) return;

        // Group items theo voucherId và lấy thông tin voucher từ danh sách vouchers
        const groups = campaignVoucherItems.reduce((acc, item) => {
            const voucherId = item.voucherId;
            if (!acc[voucherId]) {
                // Tìm thông tin voucher từ danh sách vouchers
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

        // Nếu chưa chọn voucher nào, lấy voucher đầu tiên
        if (!selectedVoucherId && Object.keys(groups).length > 0) {
            const firstVoucherId = Object.keys(groups)[0];
            setSelectedVoucherId(firstVoucherId);
            setSelectedVoucher(groups[firstVoucherId].voucher);
        } else if (selectedVoucherId && groups[selectedVoucherId]) {
            setSelectedVoucher(groups[selectedVoucherId].voucher);
        }

        // Sắp xếp items của voucher đang chọn
        const currentItems = groups[selectedVoucherId]?.items || [];
        let sorted = [...currentItems];

        // Sắp xếp theo ID (VI đầu)
        sorted.sort((a, b) => {
            if (a.id.startsWith('VI') && !b.id.startsWith('VI')) return -1;
            if (!a.id.startsWith('VI') && b.id.startsWith('VI')) return 1;
            return a.id.localeCompare(b.id);
        });

        setSortedVoucherItems(sorted);
    }, [campaignVoucherItems, selectedVoucherId, vouchers]);

    const value = {
        isLoading: isLoadingItems,
        error: itemsError,
        campaignVoucherItems: sortedVoucherItems,
        pagination: {
            currentPage: page,
            total: campaignVoucherItems?.length || 0,
            totalPages: Math.max(1, Math.ceil((campaignVoucherItems?.length || 0) / limit))
        },
        state,
        setState,
        page,
        limit,
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