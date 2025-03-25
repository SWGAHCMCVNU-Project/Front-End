// store/hooks/useCampuses.js
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import useGetAllCampuses from "../../../hooks/campus/useGetAllCampuses"; // Import the hook

export function useCampuses() {
  return useContext(PaginationContext);
}

export function CampusProvider({ children }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
  const [sort, setSort] = useState("Id,desc");
  const [state, setState] = useState(null);

  // SEARCH
  const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

  const { data: campusesResponse, isLoading } = useGetAllCampuses({
    searchName: search,
    page,
    size: limit,
  });
  console.log("campusesResponse:", campusesResponse); // Kiểm tra dữ liệu từ hook
  const campuses = campusesResponse?.success ? campusesResponse.data : null;
  console.log("campuses:", campuses); // Kiểm tra dữ liệu sau khi xử l

 

  const value = {
    isLoading,
    campuses,
    state,
    setState,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    sort,
    setSort,
  };

  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}