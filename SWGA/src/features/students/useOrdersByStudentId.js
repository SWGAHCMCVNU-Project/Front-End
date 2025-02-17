// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams, useSearchParams } from "react-router-dom";
// import { getOrdersByStudentId } from "../../store/api/apiStudents";

// export function useOrdersByStudentId(
//   limitParam,
//   sortFieldParam,
//   sortOrderParam
// ) {
//   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();
//   const limit = limitParam || 5;

//   const { studentId } = useParams();

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
//     data: ordersByStudentId,
//     error,
//   } = useQuery({
//     queryKey: ["ordersByStudentId", page, limit, sortBy, search, state],
//     queryFn: () =>
//       getOrdersByStudentId(studentId, { page, limit, sortBy, search, state }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = ordersByStudentId || {};

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: ["ordersByStudentId", page + 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getOrdersByStudentId(studentId, {
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: ["ordersByStudentId", page - 1, limit, sortBy, search, state],
//       queryFn: () =>
//         getOrdersByStudentId(studentId, {
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   return { isLoading, error, ordersByStudentId, currentPage: page };
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { mockStudents } from "./mockStudents";

export function useOrdersByStudentId(
  limitParam,
  sortFieldParam,
  sortOrderParam
) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const limit = limitParam || 5;

  const { studentId } = useParams();

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
    data: ordersByStudentId,
    error,
  } = useQuery({
    queryKey: ["ordersByStudentId", page, limit, sortBy, search, state],
    queryFn: () => {
      const student = mockStudents.result.find(s => s.id === Number(studentId));
      return {
        result: student?.orders || [],
        currentPage: page,
        pageSize: limit,
        pageCount: Math.ceil((student?.orders?.length || 0) / limit),
        rowCount: student?.orders?.length || 0,
        totalCount: student?.orders?.length || 0
      };
    },
  });

  // PRE-FETCHING
  const { pageCount } = ordersByStudentId || {};

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["ordersByStudentId", page + 1, limit, sortBy, search, state],
      queryFn: () => {
        const student = mockStudents.result.find(s => s.id === Number(studentId));
        return {
          result: student?.orders || [],
          currentPage: page + 1,
          pageSize: limit,
          pageCount: Math.ceil((student?.orders?.length || 0) / limit),
          rowCount: student?.orders?.length || 0,
          totalCount: student?.orders?.length || 0
        };
      },
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["ordersByStudentId", page - 1, limit, sortBy, search, state],
      queryFn: () => {
        const student = mockStudents.result.find(s => s.id === Number(studentId));
        return {
          result: student?.orders || [],
          currentPage: page - 1,
          pageSize: limit,
          pageCount: Math.ceil((student?.orders?.length || 0) / limit),
          rowCount: student?.orders?.length || 0,
          totalCount: student?.orders?.length || 0
        };
      },
    });

  return { isLoading, error, ordersByStudentId, currentPage: page };
}