// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useContext, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import PaginationContext from "../../context/PaginationContext";
// import { useTablePagination } from "../../hooks/useTablePagination";
// import storageService from "../../services/storageService";
// import { getHistoriesByBrandId } from "../../store/api/apiBrands";

// export function useBrandTransaction() {
//     return useContext(PaginationContext);
// }

// export function BrandTransactionProvider({ children }) {
//     const queryClient = useQueryClient();
//     const [searchParams] = useSearchParams();
//     const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
//     const [sort, setSort] = useState("Id,desc");
//     const brandId = storageService.getLoginId();

//     //SEARCH
//     const search =
//         searchParams.get("search") !== "" ? searchParams.get("search") : null;

//     const queryKey = ["transactionBrand", { brandId, page, limit, sort, search }];

//     const {
//         isLoading,
//         data: transactionBrand,
//         error
//     } = useQuery({
//         queryKey: queryKey,
//         queryFn: () => getHistoriesByBrandId(brandId, { page, limit, sortBy: sort, search }),
//         onSuccess: (data) => {
//             queryClient.setQueryData(['transactionBrand', { brandId, page, limit, sort, search }], data);
//         }
//     });

//     const value = {
//         isLoading,
//         transactionBrand,
//         page,
//         limit,
//         handlePageChange,
//         handleLimitChange,
//         sort,
//         setSort
//     };

//     return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../context/PaginationContext";
import { useTablePagination } from "../../hooks/useTablePagination";
import { mockTransactions } from "./mockTransactions";

export function useBrandTransaction() {
    return useContext(PaginationContext);
}

export function BrandTransactionProvider({ children }) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
    const [sort, setSort] = useState("Id,desc");

    //SEARCH
    const search =
        searchParams.get("search") !== "" ? searchParams.get("search") : null;

    const queryKey = ["transactionBrand", { page, limit, sort, search }];

    const {
        isLoading,
        data: transactionBrand,
        error
    } = useQuery({
        queryKey: queryKey,
        queryFn: () => {
            // Giả lập API call với mock data
            return new Promise((resolve) => {
                setTimeout(() => {
                    const filteredData = search
                        ? mockTransactions.filter(t => 
                            t.storeName.toLowerCase().includes(search.toLowerCase()) ||
                            t.id.toLowerCase().includes(search.toLowerCase())
                          )
                        : mockTransactions;
                    
                    resolve({
                        data: filteredData.slice((page - 1) * limit, page * limit),
                        totalCount: filteredData.length
                    });
                }, 500);
            });
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['transactionBrand', { page, limit, sort, search }], data);
        }
    });

    const value = {
        isLoading,
        transactionBrand,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}