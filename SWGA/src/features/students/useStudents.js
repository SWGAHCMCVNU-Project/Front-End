// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSearchParams } from "react-router-dom";
// import { getStudents } from "../../store/api/apiStudents";

// export function useStudents(limitParam, sortFieldParam, sortOrderParam) {
//   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();
//   const limit = limitParam || 10;

//   //SEARCH
//   const search =
//     searchParams.get("search") !== "" ? searchParams.get("search") : null;

//   const stateIds =
//     searchParams.get("stateIds") !== "" ? searchParams.get("stateIds") : null;

//   //majorIds
//   const majorIds =
//     searchParams.get("majors") !== ""
//       ? searchParams.get("majors")?.split(",")
//       : null;

//   //campusIds
//   const campusIds =
//     searchParams.get("campuses") !== ""
//       ? searchParams.get("campuses")?.split(",")
//       : null;

//   //universityIds
//   const universityIds =
//     searchParams.get("universities") !== ""
//       ? searchParams.get("universities")?.split(",")
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
//     data: students,
//     error,
//   } = useQuery({
//     queryKey: [
//       "students",
//       page,
//       limit,
//       sortBy,
//       search,
//       stateIds,
//       majorIds,
//       campusIds,
//       universityIds,
//     ],
//     queryFn: () =>
//       getStudents({
//         page,
//         limit,
//         sortBy,
//         search,
//         stateIds,
//         majorIds,
//         campusIds,
//         universityIds,
//       }),
//   });

//   // PRE-FETCHING
//   const { pageCount } = students || {};

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "students",
//         page + 1,
//         limit,
//         sortBy,
//         search,
//         stateIds,
//         majorIds,
//         campusIds,
//         universityIds,
//       ],
//       queryFn: () =>
//         getStudents({
//           page: page + 1,
//           limit,
//           sortBy,
//           search,
//           stateIds,
//           majorIds,
//           campusIds,
//           universityIds,
//         }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: [
//         "students",
//         page - 1,
//         limit,
//         sortBy,
//         search,
//         stateIds,
//         majorIds,
//         campusIds,
//         universityIds,
//       ],
//       queryFn: () =>
//         getStudents({
//           page: page - 1,
//           limit,
//           sortBy,
//           search,
//           stateIds,
//           majorIds,
//           campusIds,
//           universityIds,
//         }),
//     });

//   return { isLoading, error, students, currentPage: page };
// }
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { mockStudents } from "./mockStudents";

export function useStudents(limitParam, sortFieldParam, sortOrderParam) {
  const [searchParams] = useSearchParams();
  
  const {
    isLoading,
    data: students,
    error,
  } = useQuery({
    queryKey: ["students", sortFieldParam, sortOrderParam, searchParams.toString()],
    queryFn: () => {
      let result = [...mockStudents.result];

      // Xử lý search
      const search = searchParams.get("search");
      if (search) {
        result = result.filter(student => 
          student.fullName.toLowerCase().includes(search.toLowerCase()) ||
          student.code.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Xử lý filter state
      const stateFilter = searchParams.get("filter");
      if (stateFilter) {
        result = result.filter(student => 
          student.stateName === stateFilter
        );
      }

      // Xử lý sort
      if (sortFieldParam && sortOrderParam) {
        result.sort((a, b) => {
          let aValue = a[sortFieldParam.charAt(0).toLowerCase() + sortFieldParam.slice(1)];
          let bValue = b[sortFieldParam.charAt(0).toLowerCase() + sortFieldParam.slice(1)];
          
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
          
          return sortOrderParam === "asc" ? 
            (aValue > bValue ? 1 : -1) : 
            (aValue < bValue ? 1 : -1);
        });
      }

      // Xử lý pagination
      const page = Number(searchParams.get("page")) || 1;
      const limit = limitParam || 10;
      const start = (page - 1) * limit;
      const paginatedResult = result.slice(start, start + limit);

      return {
        result: paginatedResult,
        currentPage: page,
        pageSize: limit,
        pageCount: Math.ceil(result.length / limit),
        rowCount: result.length,
        totalCount: mockStudents.result.length
      };
    },
  });

  return { isLoading, error, students };
}