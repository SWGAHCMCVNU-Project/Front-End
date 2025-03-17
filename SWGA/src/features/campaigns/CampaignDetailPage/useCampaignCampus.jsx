import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getCampaignCampusById } from "../../../store/api/apiCampaigns";

export function useCampaignCampus() {
    return useContext(PaginationContext);
}

export function CampaignCampusProvider({ children }) {
    // const queryClient = useQueryClient();
    const { campaignId } = useParams();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 5);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [universitiesFilter, setUniversitiesFilter] = useState([]);
    const [universitiesFilterValue, setUniversitiesFilterValue] = useState(null);
    const [areasFilter, setAreasFilter] = useState([]);
    const [areasFilterValue, setAreasFilterValue] = useState(null);

    // const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    // const queryKey = ["campaignCampuses", { campaignId, state, sort, search, page, limit, universitiesFilterValue, areasFilterValue }];

    // const {
    //     isLoading,
    //     data: campaignCampuses,
    //     error
    // } = useQuery({
    //     queryKey: queryKey,
    //     queryFn: () => getCampaignCampusById(campaignId, { state, sort, search, page, limit, universitiesFilterValue, areasFilterValue }),
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(['campaignCampuses', { campaignId, state, sort, search, page, limit, universitiesFilterValue, areasFilterValue }], data);
    //     }
    // });

    const value = {
        isLoading: false,
        campaignCampuses: null,
        state,
        setState,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort,
        universitiesFilter,
        universitiesFilterValue,
        setUniversitiesFilter,
        setUniversitiesFilterValue,
        areasFilter,
        areasFilterValue,
        setAreasFilter,
        setAreasFilterValue,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}