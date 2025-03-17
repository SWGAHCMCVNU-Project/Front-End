import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getCampaignStoreById } from "../../../store/api/apiCampaigns";

export function useCampaignStore() {
    return useContext(PaginationContext);
}

export function CampaignStoreProvider({ children }) {
    // const queryClient = useQueryClient();
    const { campaignId } = useParams();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 5);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [brandsFilter, setBrandsFilter] = useState([]);
    const [brandsFilterValue, setBrandsFilterValue] = useState(null);
    const [areasFilter, setAreasFilter] = useState([]);
    const [areasFilterValue, setAreasFilterValue] = useState(null);

    // const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    // const queryKey = ["campaignStores", { campaignId, state, sort, search, page, limit, brandsFilterValue, areasFilterValue }];

    // const {
    //     isLoading,
    //     data: campaignStores,
    //     error
    // } = useQuery({
    //     queryKey: queryKey,
    //     queryFn: () => getCampaignStoreById(campaignId, { state, sort, search, page, limit, brandsFilterValue, areasFilterValue }),
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(['campaignStores', { campaignId, state, sort, search, page, limit, brandsFilterValue, areasFilterValue }], data);
    //     }
    // });

    const value = {
        isLoading: false,
        campaignStores: null,
        state,
        setState,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort,
        brandsFilter,
        brandsFilterValue,
        setBrandsFilter,
        setBrandsFilterValue,
        areasFilter,
        areasFilterValue,
        setAreasFilter,
        setAreasFilterValue,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}