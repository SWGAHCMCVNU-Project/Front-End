// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useContext, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import PaginationContext from "../../../context/PaginationContext";
// import { useTablePagination } from "../../../hooks/useTablePagination";
// import { getCampaigns } from "../../../store/api/apiCampaigns";

// export function useCampaign() {
//     return useContext(PaginationContext);
// }

// export function CampaignProvider({ children }) {
//     const queryClient = useQueryClient();
//     const [searchParams] = useSearchParams();
//     const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
//     const [sort, setSort] = useState("Id,desc");
//     const [statesFilter, setStatesFilter] = useState([]);
//     const [statesFilterValue, setStatesFilterValue] = useState(undefined);

//     //SEARCH
//     const search =
//         searchParams.get("search") !== "" ? searchParams.get("search") : null;

//     //Filter by brandIds
//     const brandIds =
//         searchParams.get("brandIds") !== ""
//             ? searchParams.get("brandIds")?.split(",")
//             : null;

//     //Filter by campaignTypeIds
//     const campaignTypeIds =
//         searchParams.get("campaignTypeIds") !== ""
//             ? searchParams.get("campaignTypeIds")?.split(",")
//             : null;

//     const queryKey = ["campaigns", {
//         sort, search, page, limit,
//         brandIds, campaignTypeIds, statesFilterValue
//     }];

//     const {
//         isLoading,
//         data: campaigns,
//         error
//     } = useQuery({
//         queryKey: queryKey,
//         queryFn: () => getCampaigns({
//             sort, search, page, limit,
//             brandIds, campaignTypeIds, statesFilterValue
//         }),
//         onSuccess: (data) => {
//             queryClient.setQueryData(['campaigns', {
//                 sort, search, page, limit,
//                 brandIds, campaignTypeIds, statesFilterValue
//             }], data);
//         }
//     });


//     const value = {
//         isLoading,
//         campaigns,
//         page,
//         limit,
//         handlePageChange,
//         handleLimitChange,
//         sort,
//         setSort,
//         statesFilter,
//         statesFilterValue,
//         setStatesFilter,
//         setStatesFilterValue
//     };

//     return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
// }
import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { mockCampaigns } from "./mockData";
import PaginationContext from "../../../context/PaginationContext";

export function useCampaign() {
    return useContext(PaginationContext);
}

export function CampaignProvider({ children }) {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState("Id,desc");
    const [statesFilter, setStatesFilter] = useState([]);
    const [statesFilterValue, setStatesFilterValue] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handlePageChange = (newPage) => setPage(newPage);
    const handleLimitChange = (newLimit) => setLimit(newLimit);

    //SEARCH
    const search =
        searchParams.get("search") !== "" ? searchParams.get("search") : null;

    //Filter by brandIds
    const brandIds =
        searchParams.get("brandIds") !== ""
            ? searchParams.get("brandIds")?.split(",")
            : null;

    //Filter by campaignTypeIds
    const campaignTypeIds =
        searchParams.get("campaignTypeIds") !== ""
            ? searchParams.get("campaignTypeIds")?.split(",")
            : null;

    // Giả lập data từ mockData
    const campaigns = mockCampaigns;

    const value = {
        isLoading,
        campaigns,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort,
        statesFilter,
        statesFilterValue,
        setStatesFilter,
        setStatesFilterValue
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}