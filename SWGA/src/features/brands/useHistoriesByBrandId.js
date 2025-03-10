// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams, useSearchParams } from "react-router-dom";
// import { getHistoriesByBrandId } from "../../store/api/apiBrands";

// export function useHistoriesByBrandId(
//   limitParam,
//   sortFieldParam,
//   sortOrderParam
// ) {
//   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();
//   const limit = limitParam || 10;

//   const { brandId } = useParams();

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
//     data: historiesByBrandId,
//     error,
//   } = useQuery({
//     queryKey: ["historiesByBrandId", page, limit, sortBy, search, state],
//     queryFn: () =>
//       getHistoriesByBrandId(brandId, { page, limit, sortBy, search, state }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = historiesByBrandId || {};

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: ["historiesByBrandId", page + 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getHistoriesByBrandId(brandId, {
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: ["historiesByBrandId", page - 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getHistoriesByBrandId(brandId, {
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   return { isLoading, error, historiesByBrandId, currentPage: page };
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { mockBrands } from "./mockBrands";

export function useHistoriesByBrandId(limitParam, sortFieldParam, sortOrderParam) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const limit = limitParam || 10;
  const { brandId } = useParams();

  //SEARCH
  const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

  //STATE
  const state = searchParams.get("state") !== "" ? searchParams.get("state") : null;

  //SORT
  const sortByRaw = searchParams.get("sortBy") || "Id-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortField = sortFieldParam || field;
  const sortOrder = sortOrderParam || direction;
  const sortBy = `${sortField},${sortOrder}`;

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: historiesByBrandId,
    error,
  } = useQuery({
    queryKey: ["historiesByBrandId", page, limit, sortBy, search, state],
    queryFn: () => {
      const brand = mockBrands.result.find(b => b.id === Number(brandId));
      return {
        result: brand?.histories || [],
        currentPage: page,
        pageSize: limit,
        pageCount: Math.ceil((brand?.histories?.length || 0) / limit),
        rowCount: brand?.histories?.length || 0,
        totalCount: brand?.histories?.length || 0
      };
    }
  });

  return { isLoading, error, historiesByBrandId };
}