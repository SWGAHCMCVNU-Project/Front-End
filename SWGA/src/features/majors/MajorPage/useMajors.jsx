// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useContext, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import PaginationContext from "../../../context/PaginationContext";
// import { useTablePagination } from "../../../hooks/useTablePagination";
// import { getMajors } from "../../../store/api/apiMajors";

// export function useMajors() {
//     return useContext(PaginationContext);
// }

// export function MajorProvider({ children }) {
//     const queryClient = useQueryClient();
//     const [searchParams] = useSearchParams();
//     const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
//     const [sort, setSort] = useState("Id,desc");
//     const [state, setState] = useState(null);

//     //SEARCH
//     const search =
//         searchParams.get("search") !== "" ? searchParams.get("search") : null;

//     const queryKey = ["majors", { page, limit, sort, search, state }];

//     const {
//         isLoading,
//         data: majors,
//         error
//     } = useQuery({
//         queryKey: queryKey,
//         queryFn: () => getMajors({ page, limit, sortBy: sort, search, state }),
//         onSuccess: (data) => {
//             queryClient.setQueryData(['majors', { page, limit, sort, search, state }], data);
//         }
//     });

//     const value = {
//         isLoading,
//         majors,
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
import { mockMajors } from "./mockMajors";

export function useMajors() {
    return useContext(PaginationContext);
}

export function MajorProvider({ children }) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);

    //SEARCH
    const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    const {
        isLoading,
        data: majors,
        error
    } = useQuery({
        queryKey: ["majors", page, limit, sort, search, state],
        queryFn: () => {
            let result = [...mockMajors.result];

            // Xử lý search
            if (search) {
                result = result.filter(major => 
                    major.majorName.toLowerCase().includes(search.toLowerCase())
                );
            }

            // Xử lý filter state
            if (state) {
                result = result.filter(major => 
                    state === "true" ? major.state : !major.state
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
                totalCount: mockMajors.result.length
            };
        }
    });

    const value = {
        isLoading,
        majors,
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