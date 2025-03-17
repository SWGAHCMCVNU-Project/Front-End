import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
// import { useQuery } from "@tanstack/react-query";
// import { getCampaignVoucherById } from "../../../store/api/apiCampaigns";

export function useCampaignVoucher() {
    return useContext(PaginationContext);
}

export function CampaignVoucherProvider({ children }) {
    const { campaignId } = useParams();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 5);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [voucherTypesFilter, setVoucherTypesFilter] = useState([]);
    const [voucherTypesFilterValue, setVoucherTypesFilterValue] = useState(null);

    // const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    // const queryKey = ["campaignVouchers", campaignId];

    // const {
    //     isLoading,
    //     data: campaignVouchers,
    //     error
    // } = useQuery({
    //     queryKey: queryKey,
    //     queryFn: () => getCampaignVoucherById(campaignId, { state, sort, search, page, limit, voucherTypesFilter })
    // });

    const value = {
        isLoading: false,
        campaignVouchers: null,
        state,
        setState,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort,
        voucherTypesFilter,
        voucherTypesFilterValue,
        setVoucherTypesFilter,
        setVoucherTypesFilterValue,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}