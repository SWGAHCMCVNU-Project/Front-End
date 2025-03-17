import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getCampaignActivityById } from "../../../store/api/apiCampaigns";

export function useCampaignActivity() {
    return useContext(PaginationContext);
}

export function CampaignActivityProvider({ children }) {
    // const queryClient = useQueryClient();
    const { campaignId } = useParams();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 5);
    const [statesFilter, setStatesFilter] = useState([]);
    const [statesFilterValue, setStatesFilterValue] = useState(undefined);

    // const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    // const queryKey = ["campaignActivities", { campaignId, search, page, limit, statesFilterValue }];

    // const {
    //     isLoading,
    //     data: campaignActivities,
    //     error
    // } = useQuery({
    //     queryKey: queryKey,
    //     queryFn: () => getCampaignActivityById(campaignId, { search, page, limit, statesFilterValue }),
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(['campaignActivities', { campaignId, search, page, limit, statesFilterValue }], data);
    //         queryClient.invalidateQueries(['campaignActivities']);
    //     }
    // });

    const value = {
        isLoading: false, // Giá trị mặc định khi không có API
        campaignActivities: null, // Không có dữ liệu từ API
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        statesFilter,
        statesFilterValue,
        setStatesFilter,
        setStatesFilterValue,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}