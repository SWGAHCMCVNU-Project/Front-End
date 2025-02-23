// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect } from "react";
// import storageService from "../../services/storageService";
// import { getVoucherItemsByBrandId } from "../../store/api/apiVoucherItems";

// export function useVoucherItems(limitParam, sortFieldParam, sortOrderParam) {
//   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();
//   const limit = limitParam || 10;
//   const navigate = useNavigate();

//   const brandIds = storageService.getLoginId();

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
//     data: voucherItemsByBrandId,
//     error,
//   } = useQuery({
//     queryKey: ["voucherItemsByBrandId", page, limit, sortBy, search, state],
//     queryFn: () =>
//       getVoucherItemsByBrandId({
//         page,
//         limit,
//         sortBy,
//         search,
//         state,
//         brandIds,
//       }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = voucherItemsByBrandId || {};
//   useEffect(() => {
//     // Update the URL when the component mounts
//     navigate("/voucher-items", { replace: true });
//   }, [navigate]);

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "voucherItemsByBrandId",
//         page + 1,
//         limit,
//         sortBy,
//         search,
//         state,
//         brandIds,
//       ],
//       queryFn: () =>
//         getVoucherItemsByBrandId({
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           state,
//           brandIds,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "voucherItemsByBrandId",
//         page - 1,
//         limit,
//         sortBy,
//         search,
//         state,
//         brandIds,
//       ],
//       queryFn: () =>
//         getVoucherItemsByBrandId({
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           state,
//           brandIds,
//         }),
//     });

//   return { isLoading, error, voucherItemsByBrandId, currentPage: page };
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { mockVoucherItems } from "./mockVoucherItems";

export function useVoucherItems(limitParam, sortFieldParam, sortOrderParam) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const limit = limitParam || 10;
  const navigate = useNavigate();

  //SEARCH
  const search =
    searchParams.get("search") !== "" ? searchParams.get("search") : null;

  //STATE
  const state =
    searchParams.get("state") !== "" ? searchParams.get("state") : null;

  //SORT
  const sortByRaw = searchParams.get("sortBy") || "Id-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortField = sortFieldParam || field;
  const sortOrder = sortOrderParam || direction;
  const sortBy = `${sortField},${sortOrder}`;

  // PAGINATION;
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: voucherItemsByBrandId,
    error,
  } = useQuery({
    queryKey: ["voucherItemsByBrandId", page, limit, sortBy, search, state],
    queryFn: () => mockVoucherItems,
  });

  // PRE-FETCHING
  const { pageCount } = voucherItemsByBrandId || {};
  useEffect(() => {
    // Update the URL when the component mounts
    navigate("/voucher-items", { replace: true });
  }, [navigate]);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        "voucherItemsByBrandId",
        page + 1,
        limit,
        sortBy,
        search,
        state,
      ],
      queryFn: () => mockVoucherItems,
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        "voucherItemsByBrandId",
        page - 1,
        limit,
        sortBy,
        search,
        state,
      ],
      queryFn: () => mockVoucherItems,
    });

  return { isLoading, error, voucherItemsByBrandId, currentPage: page };
}