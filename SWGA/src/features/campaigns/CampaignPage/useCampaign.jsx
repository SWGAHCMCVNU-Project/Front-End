import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import useGetAllCampaigns from "../../../hooks/campaign/useGetAllCampaigns";
import { useTablePagination } from "../../../hooks/useTablePagination";
import StorageService from '../../../services/storageService';

export function useCampaign() {
  return useContext(PaginationContext);
}

export function CampaignProvider({ children }) {
  const [searchParams] = useSearchParams();
  const { page: initialPage, limit: initialSize, handlePageChange: setInitialPage, handleLimitChange: handleSizeChange } = useTablePagination(1, 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sort, setSort] = useState("Id,desc");
  const [statesFilterValue, setStatesFilterValue] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setInitialPage(newPage);
  };

  const handleSizeChangeWithReset = (newSize) => {
    handleSizeChange(newSize);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [initialSize]);

  const search = searchParams.get("search") || null;
  const campaignTypeIds = searchParams.get("campaignTypeIds") ? searchParams.get("campaignTypeIds").split(",") : null;

  const {
    isLoading,
    data: campaigns,
    error,
    refetch,
  } = useGetAllCampaigns({
    sort,
    search,
    page: currentPage,
    size: initialSize,
    campaignTypeIds,
    statesFilterValue
  });

  useEffect(() => {
    if (error) {
      setErrorMessage("Không thể tải danh sách chiến dịch. Vui lòng thử lại sau.");
      console.error("API error:", error);
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  // Bỏ useEffect gọi refetch không cần thiết
  // useEffect(() => {
  //   if (refetch) {
  //     refetch();
  //   }
  // }, [initialSize, refetch]);

  const brandId = StorageService.getBrandId();
  console.log('🔍 brandId trong CampaignProvider:', brandId);
  console.log('🔍 Raw campaigns từ API:', campaigns);

  const mappedCampaigns = campaigns
    ? { result: campaigns.items || [], totalCount: campaigns.total || 0 }
    : { result: [], totalCount: 0 };
  console.log('🔍 Mapped campaigns:', mappedCampaigns);

  const value = {
    isLoading,
    campaigns: mappedCampaigns,
    error,
    errorMessage,
    page: currentPage,
    size: initialSize,
    handlePageChange,
    handleLimitChange: handleSizeChangeWithReset,
    sort,
    setSort,
    statesFilterValue,
    setStatesFilterValue,
    refetch,
  };

  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}