import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { mockLecturers } from "./mockLecturers"; // Đổi từ mockStudents thành mockLecturers

export function useLecturers(limitParam, sortFieldParam, sortOrderParam) {
  const [searchParams] = useSearchParams();
  
  const {
    isLoading,
    data: lecturers, // Đổi từ students thành lecturers
    error,
  } = useQuery({
    queryKey: ["lecturers", sortFieldParam, sortOrderParam, searchParams.toString()], // Đổi queryKey
    queryFn: () => {
      let result = [...mockLecturers.result]; // Đổi từ mockStudents thành mockLecturers

      // Xử lý search
      const search = searchParams.get("search");
      if (search) {
        result = result.filter(lecturer => 
          lecturer.fullName.toLowerCase().includes(search.toLowerCase()) ||
          lecturer.code.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Xử lý filter state
      const stateFilter = searchParams.get("filter");
      if (stateFilter) {
        result = result.filter(lecturer => 
          lecturer.stateName === stateFilter
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
        totalCount: mockLecturers.result.length // Đổi từ mockStudents thành mockLecturers
      };
    },
  });

  return { isLoading, error, lecturers }; // Đổi từ students thành lecturers
}