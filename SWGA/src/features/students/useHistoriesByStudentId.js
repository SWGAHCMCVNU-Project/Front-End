// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams, useSearchParams } from "react-router-dom";
// import { getHistoriesByStudentId } from "../../store/api/apiStudents";

// export function useHistoriesByStudentId(
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
//     data: historiesByStudentId,
//     error,
//   } = useQuery({
//     queryKey: ["historiesByStudentId", page, limit, sortBy, search, state],
//     queryFn: () =>
//       getHistoriesByStudentId(studentId, {
//         page,
//         limit,
//         sortBy,
//         search,
//         state,
//       }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = historiesByStudentId || {};

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "historiesByStudentId",
//         page + 1,
//         limit,
//         sortBy,
//         search,
//         state,
//       ],
//       queryFn: () =>
//         getHistoriesByStudentId(studentId, {
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "historiesByStudentId",
//         page - 1,
//         limit,
//         sortBy,
//         search,
//         state,
//       ],
//       queryFn: () =>
//         getHistoriesByStudentId(studentId, {
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           state,
//         }),
//     });

//   return { isLoading, error, historiesByStudentId, currentPage: page };
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { mockStudents } from "./mockStudents"; // Thêm import mockStudents

export function useHistoriesByStudentId(
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
    data: historiesByStudentId,
    error,
  } = useQuery({
    queryKey: ["historiesByStudentId", page, limit, sortBy, search, state],
    queryFn: () => {
      // Thay thế API call bằng mock data
      const student = mockStudents.result.find(s => s.id === Number(studentId));
      return {
        result: student?.histories || [],
        currentPage: page,
        pageSize: limit,
        pageCount: Math.ceil((student?.histories?.length || 0) / limit),
        rowCount: student?.histories?.length || 0,
        totalCount: student?.histories?.length || 0
      };
    },
  });

  // PRE-FETCHING
  const { pageCount } = historiesByStudentId || {};

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        "historiesByStudentId",
        page + 1,
        limit,
        sortBy,
        search,
        state,
      ],
      queryFn: () => {
        const student = mockStudents.result.find(s => s.id === Number(studentId));
        return {
          result: student?.histories || [],
          currentPage: page + 1,
          pageSize: limit,
          pageCount: Math.ceil((student?.histories?.length || 0) / limit),
          rowCount: student?.histories?.length || 0,
          totalCount: student?.histories?.length || 0
        };
      },
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        "historiesByStudentId",
        page - 1,
        limit,
        sortBy,
        search,
        state,
      ],
      queryFn: () => {
        const student = mockStudents.result.find(s => s.id === Number(studentId));
        return {
          result: student?.histories || [],
          currentPage: page - 1,
          pageSize: limit,
          pageCount: Math.ceil((student?.histories?.length || 0) / limit),
          rowCount: student?.histories?.length || 0,
          totalCount: student?.histories?.length || 0
        };
      },
    });

  return { isLoading, error, historiesByStudentId, currentPage: page };
}