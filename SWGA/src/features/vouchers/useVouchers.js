// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import storageService from "../../services/storageService";
// import { getVouchers } from "../../store/api/apiVouchers";

// export function useVouchers(limitParam, sortFieldParam, sortOrderParam) {
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
//     data: vouchersByBrandId,
//     error,
//   } = useQuery({
//     queryKey: ["vouchersByBrandId", page, limit, sortBy, search, state],
//     queryFn: () =>
//       getVouchers({ page, limit, sortBy, search, state, brandIds }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = vouchersByBrandId || {};
//   useEffect(() => {
//     navigate("/vouchers", { replace: true });
//   }, [navigate]);

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "vouchersByBrandId",
//         page + 1,
//         limit,
//         sortBy,
//         search,
//         state,
//         brandIds,
//       ],
//       queryFn: () =>
//         getVouchers({ page: page + 1, limit, sortBy, search, state, brandIds }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "vouchersByBrandId",
//         page - 1,
//         limit,
//         sortBy,
//         search,
//         state,
//         brandIds,
//       ],
//       queryFn: () =>
//         getVouchers({ page: page - 1, limit, sortBy, search, state, brandIds }),
//     });

//   return { isLoading, error, vouchersByBrandId, currentPage: page };
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockVouchers } from "./mockVouchers";

export function useVouchers(limitParam, sortFieldParam, sortOrderParam) {
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
    data: vouchersByBrandId,
    error,
  } = useQuery({
    queryKey: ["vouchersByBrandId", page, limit, sortBy, search, state],
    queryFn: () => Promise.resolve(mockVouchers)
  });

  useEffect(() => {
    navigate("/vouchers", { replace: true });
  }, [navigate]);

  return { isLoading, error, vouchersByBrandId, currentPage: page };
}