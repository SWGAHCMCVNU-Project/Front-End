import { useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import useGetAllCampaigns from "../../../hooks/campaign/useGetAllCampaigns";
import useGetAllCampaignsAdmin from "../../../hooks/campaign/useGetAllCampaignsAdmin";
import { useTablePagination } from "../../../hooks/useTablePagination";
import StorageService from "../../../services/storageService";
import PropTypes from "prop-types";

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

  const roleLogin = StorageService.getRoleLogin().toLowerCase();
  const isAdmin = roleLogin === "admin";

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

  // Query cho brand (mặc định)
  const {
    isLoading: isLoadingBrand,
    data: campaignsBrand,
    error: errorBrand,
    refetch: refetchBrand,
  } = useGetAllCampaigns({
    sort,
    search,
    page: currentPage,
    size: initialSize,
    campaignTypeIds,
    statesFilterValue,
    enabled: !isAdmin, // Chỉ enable khi không phải admin
  });

  // Query cho admin
  const {
    isLoading: isLoadingAdmin,
    data: campaignsAdmin,
    error: errorAdmin,
    refetch: refetchAdmin,
  } = useGetAllCampaignsAdmin({
    sort,
    search,
    page: currentPage,
    size: initialSize,
    enabled: isAdmin, // Chỉ enable khi là admin
  });

  // Combine data dựa vào role
  const isLoading = isAdmin ? isLoadingAdmin : isLoadingBrand;
  const campaigns = isAdmin ? campaignsAdmin : campaignsBrand;
  const error = isAdmin ? errorAdmin : errorBrand;
  const refetch = isAdmin ? refetchAdmin : refetchBrand;

  useEffect(() => {
    setErrorMessage(error ? "Không thể tải danh sách chiến dịch. Vui lòng thử lại sau." : null);
    if (error) console.error("API error:", error);
  }, [error]);

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
      isAdmin,
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
      isAdmin,
    ]
  );

  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}

CampaignProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
