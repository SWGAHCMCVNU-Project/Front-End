// useFeedback.js
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockFeedback } from "./mockFeedback";

export function useFeedback() {
  return useContext(PaginationContext);
}

export function FeedbackProvider({ children }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
  const [sort, setSort] = useState("Id,desc");
  const [status, setStatus] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [categoryFilterValue, setCategoryFilterValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Tìm kiếm
  const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

  const { isLoading, data: feedbacks } = useQuery({
    queryKey: ["feedback", { status, sort, search, page, limit, categoryFilterValue }],
    queryFn: () => Promise.resolve(mockFeedback)
  });

  const { isLoading: isDeleting, mutate: removeFeedback } = useMutation({
    mutationFn: (id) => {
      // Giả lập xóa feedback
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id);
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      setIsModalVisible(false);
    }
  });

  const value = {
    isLoading,
    isDeleting,
    feedbacks,
    status,
    setStatus,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    sort,
    setSort,
    removeFeedback,
    categoryFilter,
    categoryFilterValue,
    setCategoryFilter,
    setCategoryFilterValue,
    isModalVisible,
    setIsModalVisible
  };

  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}
