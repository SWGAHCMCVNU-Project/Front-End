// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams, useSearchParams } from "react-router-dom";
// import { getChallengesByStudentId } from "../../store/api/apiStudents";

// export function useChallengesByStudentId(
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

//   //COMPLETE
//   const isCompleted =
//     searchParams.get("isCompleted") !== ""
//       ? searchParams.get("isCompleted")
//       : null;
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
//     data: challengesByStudentId,
//     error,
//   } = useQuery({
//     queryKey: [
//       "challengesByStudentId",
//       page,
//       limit,
//       sortBy,
//       search,
//       state,
//       isCompleted,
//     ],
//     queryFn: () =>
//       getChallengesByStudentId(studentId, {
//         page,
//         limit,
//         sortBy,
//         search,
//         state,
//         isCompleted,
//       }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = challengesByStudentId || {};

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "challengesByStudentId",
//         page + 1,
//         limit,
//         sortBy,
//         search,
//         state,
//         isCompleted,
//       ],
//       queryFn: () =>
//         getChallengesByStudentId(studentId, {
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           state,
//           isCompleted,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "challengesByStudentId",
//         page - 1,
//         limit,
//         sortBy,
//         search,
//         state,
//         isCompleted,
//       ],
//       queryFn: () =>
//         getChallengesByStudentId(studentId, {
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           state,
//           isCompleted,
//         }),
//     });

//   return { isLoading, error, challengesByStudentId, currentPage: page };
// }
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { mockStudents } from "./mockStudents";

export function useChallengesByStudentId(
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
    data: challengesByStudentId,
    error,
  } = useQuery({
    queryKey: ["challengesByStudentId", page, limit, sortBy, search, state],
    queryFn: () => {
      const student = mockStudents.result.find(s => s.id === Number(studentId));
      return {
        result: student?.challenges || [],
        currentPage: page,
        pageSize: limit,
        pageCount: Math.ceil((student?.challenges?.length || 0) / limit),
        rowCount: student?.challenges?.length || 0,
        totalCount: student?.challenges?.length || 0
      };
    },
  });

  // PRE-FETCHING
  const { pageCount } = challengesByStudentId || {};

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        "challengesByStudentId",
        page + 1,
        limit,
        sortBy,
        search,
        state,
      ],
      queryFn: () => {
        const student = mockStudents.result.find(s => s.id === Number(studentId));
        return {
          result: student?.challenges || [],
          currentPage: page + 1,
          pageSize: limit,
          pageCount: Math.ceil((student?.challenges?.length || 0) / limit),
          rowCount: student?.challenges?.length || 0,
          totalCount: student?.challenges?.length || 0
        };
      },
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        "challengesByStudentId",
        page - 1,
        limit,
        sortBy,
        search,
        state,
      ],
      queryFn: () => {
        const student = mockStudents.result.find(s => s.id === Number(studentId));
        return {
          result: student?.challenges || [],
          currentPage: page - 1,
          pageSize: limit,
          pageCount: Math.ceil((student?.challenges?.length || 0) / limit),
          rowCount: student?.challenges?.length || 0,
          totalCount: student?.challenges?.length || 0
        };
      },
    });

  return { isLoading, error, challengesByStudentId, currentPage: page };
}