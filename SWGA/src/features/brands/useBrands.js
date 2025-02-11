// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { getBrands } from "../../store/api/apiBrands";

// export function useBrands(limitParam, sortFieldParam, sortOrderParam) {
//   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();
//   const limit = limitParam || 10;
//   const navigate = useNavigate();

//   //SEARCH
//   const search =
//     searchParams.get("search") !== "" ? searchParams.get("search") : null;

//   //STATE
//   const state =
//     searchParams.get("state") !== "" ? searchParams.get("state") : null;

//   //SORT
//   const sortByRaw = searchParams.get("sortBy") || "Id-desc";
//   const [field, direction] = sortByRaw.split("-");
//   const sortField = sortFieldParam || field;
//   const sortOrder = sortOrderParam || direction;
//   const sortBy = `${sortField},${sortOrder}`;

//   // PAGINATION;
//   const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

//   const {
//     isLoading,
//     data: brands,
//     error,
//   } = useQuery({
//     queryKey: ["brands", page, limit, sortBy, search, state],
//     queryFn: () => getBrands({ page, limit, sortBy, search, state }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = brands || {};
//   useEffect(() => {
//     navigate("/brands", { replace: true });
//   }, [navigate]);

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: ["brands", page + 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getBrands({ page: page + 1, limit, sortBy, search, state }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: ["brands", page - 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getBrands({ page: page - 1, limit, sortBy, search, state }),
//     });

//   return { isLoading, error, brands, currentPage: page };
// }
import { useQuery } from "@tanstack/react-query";
import { mockBrands } from "./mockBrands";

export function useBrands(limitParam, sortFieldParam, sortOrderParam) {
  const {
    isLoading,
    data: brands,
    error,
  } = useQuery({
    queryKey: ["brands", limitParam, sortFieldParam, sortOrderParam],
    queryFn: () => {
      let result = [...mockBrands.result];

      // Xử lý sort
      if (sortFieldParam && sortOrderParam) {
        result.sort((a, b) => {
          let aValue = a[sortFieldParam.charAt(0).toLowerCase() + sortFieldParam.slice(1)];
          let bValue = b[sortFieldParam.charAt(0).toLowerCase() + sortFieldParam.slice(1)];
          
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
          
          if (sortOrderParam === "asc") {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      // Xử lý search từ URL params
      const urlParams = new URLSearchParams(window.location.search);
      const searchTerm = urlParams.get("search");
      if (searchTerm) {
        result = result.filter(brand => 
          brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Xử lý filter state
      const stateFilter = urlParams.get("state");
      if (stateFilter !== null && stateFilter !== "") {
        result = result.filter(brand => 
          brand.state === (stateFilter === "true")
        );
      }

      // Xử lý pagination
      const page = Number(urlParams.get("page")) || 1;
      const limit = limitParam || 10;
      const start = (page - 1) * limit;
      const paginatedResult = result.slice(start, start + limit);

      return {
        result: paginatedResult,
        currentPage: page,
        pageSize: limit,
        pageCount: Math.ceil(result.length / limit),
        rowCount: result.length,
        totalCount: mockBrands.result.length
      };
    },
  });

  return { isLoading, error, brands };
}