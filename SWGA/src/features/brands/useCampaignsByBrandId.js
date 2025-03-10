// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams, useSearchParams } from "react-router-dom";
// import { getCampaignsByBrandId } from "../../store/api/apiBrands";

// export function useCampaignsByBrandId(
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
//     data: campaignsByBrandId,
//     error,
//   } = useQuery({
//     queryKey: ["campaignsByBrandId", page, limit, sortBy, search, state],
//     queryFn: () =>
//       getCampaignsByBrandId(brandId, { page, limit, sortBy, search, state }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = campaignsByBrandId || {};

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: ["campaignsByBrandId", page + 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getCampaignsByBrandId(brandId, {
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: ["campaignsByBrandId", page - 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getCampaignsByBrandId(brandId, {
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   return { isLoading, error, campaignsByBrandId, currentPage: page };
// }
