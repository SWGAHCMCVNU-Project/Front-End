import { useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import useGetAllCampaigns from "../../../hooks/campaign/useGetAllCampaigns";
import { useTablePagination } from "../../../hooks/useTablePagination";
// import StorageService from "../../../services/storageService";

export function useCampaign() {
  return useContext(PaginationContext);
}

export function CampaignProvider({ children }) {
  const [searchParams] = useSearchParams();
  const { page: initialPage, limit: initialSize, handlePageChange: setInitialPage, handleLimitChange: setInitialSize } = useTablePagination(1, 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sort, setSort] = useState("Id,desc");
  const [statesFilterValue, setStatesFilterValue] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [initialSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setInitialPage(newPage);
  };

  const handleSizeChangeWithReset = (newSize) => {
    setInitialSize(newSize);
    setCurrentPage(1);
  };

  const search = searchParams.get("search") || null;
  const campaignTypeIds = searchParams.get("campaignTypeIds")?.split(",") || null;

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
    statesFilterValue,
  });

  useEffect(() => {
    setErrorMessage(error ? "Không thể tải danh sách chiến dịch. Vui lòng thử lại sau." : null);
    if (error) console.error("API error:", error);
  }, [error]);

  // const brandId = useMemo(() => StorageService.getBrandId(), []);
  // const roleLogin = useMemo(() => StorageService.getRoleLogin(), []);

  const mappedCampaigns = useMemo(
    () => ({
      result: campaigns?.items || [],
      totalCount: campaigns?.total || 0,
    }),
    [campaigns]
  );

  const value = useMemo(
    () => ({
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
      // brandId: brandId ?? (roleLogin === "admin" ? null : undefined),
    }),
    [
      isLoading,
      mappedCampaigns,
      error,
      errorMessage,
      currentPage,
      initialSize,
      sort,
      statesFilterValue,
      refetch,
      // brandId,
      // roleLogin,
    ]
  );

  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}
