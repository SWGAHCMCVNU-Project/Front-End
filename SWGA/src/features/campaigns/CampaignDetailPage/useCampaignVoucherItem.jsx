import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getVoucherItems } from "../../../store/api/apiVoucherItems";

export function useCampaignVoucherItem() {
    return useContext(PaginationContext);
}

export function CampaignVoucherItemProvider({ children }) {
    // const queryClient = useQueryClient();
    const { campaignId } = useParams();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 5);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [campaignFilterValue, setCampaignFilterValue] = useState(null);
    const [campaignItemsFilter, setCampaignItemsFilter] = useState([]);
    const [campaignItemsFilterValue, setCampaignItemsFilterValue] = useState(null);
    const [isLocked, setIsLocked] = useState(true);
    const [isBought, setIsBought] = useState(false);
    const [isUsed, setIsUsed] = useState(false);

    // const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    // const queryKey = ["campaignVoucherItems", { campaignId, state, sort, search, page, limit, campaignFilterValue, campaignItemsFilterValue, isLocked, isBought, isUsed }];

    // const {
    //     isLoading,
    //     data: campaignVoucherItems,
    //     error
    // } = useQuery({
    //     queryKey: queryKey,
    //     queryFn: () => getVoucherItems({ state, sort, search, page, limit, campaignFilterValue: campaignId, campaignItemsFilterValue, isLocked, isBought, isUsed }),
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(["campaignVoucherItems", { campaignId, state, sort, search, page, limit, campaignFilterValue, campaignItemsFilterValue, isLocked, isBought, isUsed }], data);
    //     }
    // });

    const value = {
        isLoading: false,
        campaignVoucherItems: null,
        state,
        setState,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort,
        isLocked,
        setIsLocked,
        isBought,
        setIsBought,
        isUsed,
        setIsUsed,
        campaignItemsFilter,
        campaignItemsFilterValue,
        setCampaignItemsFilter,
        setCampaignItemsFilterValue,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}