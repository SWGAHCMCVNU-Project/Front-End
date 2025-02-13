// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useContext, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useTablePagination } from "../../../hooks/useTablePagination";
// import PaginationContext from "../../../context/PaginationContext";
// import { getUniversities } from "../../../store/api/apiUniversities";

// export function useUniversities() {
//     return useContext(PaginationContext);
// }

// export function UniversityProvider({ children }) {
//     const queryClient = useQueryClient();
//     const [searchParams] = useSearchParams();
//     const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
//     const [sort, setSort] = useState("Id,desc");
//     const [state, setState] = useState(null);

//     //SEARCH
//     const search =
//         searchParams.get("search") !== "" ? searchParams.get("search") : null;

//     const queryKey = ["universities", { page, limit, sort, search, state }];

//     const {
//         isLoading,
//         data: universities,
//         error
//     } = useQuery({
//         queryKey: queryKey,
//         queryFn: () => getUniversities({ page, limit, sortBy: sort, search, state }),
//         onSuccess: (data) => {
//             queryClient.setQueryData(['universities', { page, limit, sort, search, state }], data);
//         }
//     });

//     const value = {
//         isLoading,
//         universities,
//         state,
//         setState,
//         page,
//         limit,
//         handlePageChange,
//         handleLimitChange,
//         sort,
//         setSort
//     };

//     return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
// }
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { mockUniversities } from "./mockUniversity";

export function useUniversities() {
    return useContext(PaginationContext);
}

export function UniversityProvider({ children }) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);

    //SEARCH
    const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    const {
        isLoading,
        data: universities,
        error
    } = useQuery({
        queryKey: ["universities", page, limit, sort, search, state],
        queryFn: () => {
            let result = [...mockUniversities.result];

            // Xử lý search
            if (search) {
                result = result.filter(university => 
                    university.universityName.toLowerCase().includes(search.toLowerCase())
                );
            }

            // Xử lý filter state
            if (state) {
                result = result.filter(university => 
                    state === "true" ? university.state : !university.state
                );
            }

            // Xử lý sort
            if (sort) {
                const [field, order] = sort.split(",");
                result.sort((a, b) => {
                    let aValue = a[field.charAt(0).toLowerCase() + field.slice(1)];
                    let bValue = b[field.charAt(0).toLowerCase() + field.slice(1)];
                    
                    if (typeof aValue === 'string') {
                        aValue = aValue.toLowerCase();
                        bValue = bValue.toLowerCase();
                    }
                    
                    return order === "asc" 
                        ? aValue > bValue ? 1 : -1
                        : aValue < bValue ? 1 : -1;
                });
            }

            // Xử lý pagination
            const start = (page - 1) * limit;
            const paginatedResult = result.slice(start, start + limit);

            return {
                result: paginatedResult,
                currentPage: page,
                pageSize: limit,
                pageCount: Math.ceil(result.length / limit),
                rowCount: result.length,
                totalCount: mockUniversities.result.length
            };
        }
    });

    const value = {
        isLoading,
        universities,
        state,
        setState,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}

    