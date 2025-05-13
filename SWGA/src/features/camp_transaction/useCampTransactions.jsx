import { useContext, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../context/PaginationContext";
import { useTablePagination } from "../../hooks/useTablePagination";
import { useGetCampTransactions } from "../../hooks/camp_transation/useGetCampTransactions";
import StorageService from "../../services/storageService";
import { useQueryClient } from "@tanstack/react-query";
import useCampaignsByBrandId from "../../hooks/campaign/useCampaignsByBrandId";

export function useCampTransactions() {
  return useContext(PaginationContext);
}

export function CampTransactionsProvider({ children }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { page, limit, handlePageChange, handleLimitChange } =
    useTablePagination(1, 10);
  const [sort, setSort] = useState("dateCreated,desc");

  // Get brandId from URL search params, or fall back to StorageService
  let brandId = searchParams.get("brandId") || null;
  if (!brandId) {
    const role = StorageService.getRoleLogin();
    if (role === "brand") {
      brandId = StorageService.getBrandId();
    }
  }

  // Fetch camp transactions using the brandId, page, and size (limit)
  const {
    data: transactions,
    error,
    isLoading,
  } = useGetCampTransactions({
    brandId,
    page,
    size: limit,
  });

  // Fetch campaigns to map campaignId to campaign name
  const { campaigns } = useCampaignsByBrandId(brandId);

  // Create a map of campaignId to campaign name
  // Trong CampTransactionsProvider, sửa phần tạo campaignMap:
  // Trong CampTransactionsProvider, sửa phần tạo campaignMap:
  const campaignMap = useMemo(() => {
    return campaigns.reduce((acc, campaign) => {
      acc[campaign.id] =
        campaign.name || campaign.title || campaign.campaignName;
      return acc;
    }, {});
  }, [campaigns]);

  // Process transactions data with campaign names
  const processedTransactions = useMemo(() => {
    if (!transactions?.items) return [];

    return transactions.items.map((transaction) => ({
      ...transaction,
      campaignName:
        campaignMap[transaction.campaignId] || transaction.campaignId, // Fallback to ID if name not found
    }));
  }, [transactions, campaignMap]);

  // Data is paginated from the server
  const campTransactions = processedTransactions;
  const totalCount = transactions?.total || 0;

  // SEARCH: Filter by campId or description if search term exists
  const search = searchParams.get("search") || null;
  const filteredTransactions = search
    ? campTransactions.filter(
        (transaction) =>
          transaction.campaignName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.description?.toLowerCase().includes(search.toLowerCase())
      )
    : campTransactions;

  // SORT: Sort data based on sort state
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const [field, order] = sort.split(",");
    const direction = order === "asc" ? 1 : -1;
    if (field === "dateCreated") {
      return direction * (new Date(a.dateCreated) - new Date(b.dateCreated));
    }
    if (field === "amount") {
      return direction * (a.amount - b.amount);
    }
    if (field === "campaignName") {
      return direction * a.campaignName.localeCompare(b.campaignName);
    }
    return 0;
  });

  const value = {
    isLoading,
    campTransactions: { data: sortedTransactions, totalCount },
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    sort,
    setSort,
    error,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}
