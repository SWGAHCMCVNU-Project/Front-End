// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams, useSearchParams } from "react-router-dom";
// import { getVouchersByBrandId } from "../../store/api/apiBrands";

// export function useVouchersByBrandId(
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
//     data: vouchersByBrandId,
//     error,
//   } = useQuery({
//     queryKey: ["vouchersByBrandId", page, limit, sortBy, search, state],
//     queryFn: () =>
//       getVouchersByBrandId(brandId, { page, limit, sortBy, search, state }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = vouchersByBrandId || {};

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: ["vouchersByBrandId", page + 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getVouchersByBrandId(brandId, {
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: ["vouchersByBrandId", page - 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getVouchersByBrandId(brandId, {
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   return { isLoading, error, vouchersByBrandId, currentPage: page };
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { mockBrands } from "./mockBrands";

export function useVouchersByBrandId(limitParam, sortFieldParam, sortOrderParam) {
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
    data: vouchersByBrandId,
    error,
  } = useQuery({
    queryKey: ["vouchersByBrandId", page, limit, sortBy, search, state],
    queryFn: () => {
      const brand = mockBrands.result.find(b => b.id === Number(brandId));
      return {
        result: brand?.vouchers || [],
        currentPage: page,
        pageSize: limit,
        pageCount: Math.ceil((brand?.vouchers?.length || 0) / limit),
        rowCount: brand?.vouchers?.length || 0,
        totalCount: brand?.vouchers?.length || 0
      };
    }
  });

  return { isLoading, error, vouchersByBrandId };
}