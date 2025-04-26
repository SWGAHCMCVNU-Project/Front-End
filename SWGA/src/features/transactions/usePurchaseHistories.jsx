import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../context/PaginationContext";
import { useTablePagination } from "../../hooks/useTablePagination";
import { useGetPurchaseHistory } from "../../hooks/buy-point/useGetPurchaseHistory";
import StorageService from "../../services/storageService"; // Import StorageService to get role and IDs

export function usePurchaseHistories() {
    return useContext(PaginationContext);
}

export function PurchaseHistoriesProvider({ children }) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
    const [sort, setSort] = useState("createdDate,desc");
  
    // Get id from URL search params, or fall back to StorageService
    let id = searchParams.get("id") || null;
    if (!id) {
      const role = StorageService.getRoleLogin();
      if (role === "brand") {
        id = StorageService.getBrandId();
      } else if (role === "campus") {
        id = StorageService.getCampusId();
      }
    }
  
    // Fetch purchase history using the id, page, and size (limit)
    const { data: histories, error, isLoading } = useGetPurchaseHistory({ id, page, size: limit });
  
    // Dữ liệu đã được phân trang từ server, không cần slice thủ công nữa
    const purchaseHistories = histories?.items || [];
    const totalCount = histories?.total || 0;
  
    // SEARCH: Filter by id or entityType if search term exists
    const search = searchParams.get("search") || null;
    const filteredHistories = search
      ? purchaseHistories.filter(history =>
          history.id.toLowerCase().includes(search.toLowerCase()) ||
          history.entityType.toLowerCase().includes(search.toLowerCase())
        )
      : purchaseHistories;
  
    // SORT: Sort data based on sort state
    const sortedHistories = [...filteredHistories].sort((a, b) => {
      const [field, order] = sort.split(",");
      const direction = order === "asc" ? 1 : -1;
      if (field === "createdDate") {
        return direction * (new Date(a.createdDate) - new Date(b.createdDate));
      }
      if (field === "amount") {
        return direction * (a.amount - b.amount);
      }
      if (field === "id") {
        return direction * a.id.localeCompare(b.id);
      }
      return 0;
    });
  
    const value = {
      isLoading,
      purchaseHistories: { data: sortedHistories, totalCount },
      page,
      limit,
      handlePageChange,
      handleLimitChange,
      sort,
      setSort,
      error,
    };
  
    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
  }