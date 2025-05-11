import { useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import useCampaignsByBrandId from "../../../hooks/campaign/useCampaignsByBrandId";
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
  const [statesFilterValue, setStatesFilterValue] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);

  const roleLogin = StorageService.getRoleLogin().toLowerCase();
  const isAdmin = roleLogin === "admin";

  const brandId = StorageService.getBrandId?.() || null;

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

  const search = searchParams.get("search") || "";
  const campaignTypeIds = searchParams.get("campaignTypeIds")?.split(",") || null;

  const normalizedStates = statesFilterValue === undefined ? null : statesFilterValue;

  const {
    campaigns: campaignsBrand,
    loading: isLoadingBrand,
    error: errorBrand,
    pagination: brandPagination,
    refetch: refetchBrand,
  } = useCampaignsByBrandId(brandId, {
    page: currentPage,
    size: initialSize,
    searchName: search,
    campaignTypeIds,
    statesFilterValue: normalizedStates,
  });

  // Filter campaigns for brand role
  const today = new Date();
  const filteredBrandCampaigns = normalizedStates === null
    ? campaignsBrand || [] // Ensure campaignsBrand is an array
    : campaignsBrand?.filter(campaign => {
        const statusFilter = parseInt(normalizedStates, 10);
        const campaignStatus = campaign.status;
        const startDate = new Date(campaign.startOn);
        const endDate = new Date(campaign.endOn);

        // Nếu chiến dịch đã bị từ chối (status = 3), giữ nguyên trạng thái
        if (campaignStatus === 3) {
          return statusFilter === 3;
        }

        if (statusFilter === 1) {
          return campaignStatus === 1 && today >= startDate && today <= endDate;
        } else if (statusFilter === 0) {
          return campaignStatus === 0 || (campaignStatus === 1 && (today < startDate || today > endDate));
        } else {
          return campaignStatus === statusFilter;
        }
      }) || [];

  const {
    isLoading: isLoadingAdmin,
    data: campaignsAdminData,
    error: errorAdmin,
    refetch: refetchAdmin,
  } = useGetAllCampaignsAdmin({
    search,
    page: currentPage,
    size: initialSize,
    statesFilterValue: normalizedStates,
    enabled: isAdmin,
  });

  // Normalize admin data structure to match brand data structure
  const campaignsAdmin = campaignsAdminData
    ? {
        items: campaignsAdminData.items || campaignsAdminData,
        page: campaignsAdminData.page || currentPage,
        totalPages: campaignsAdminData.totalPages || 1,
        total: campaignsAdminData.total || campaignsAdminData.length,
      }
    : null;

  // Filter campaigns for admin role
  const filteredAdminCampaigns = normalizedStates === null || !campaignsAdmin
    ? campaignsAdmin?.items || [] // Ensure campaignsAdmin.items is an array
    : campaignsAdmin.items?.filter(campaign => {
        const statusFilter = parseInt(normalizedStates, 10);
        const campaignStatus = campaign.status;
        const startDate = new Date(campaign.startOn);
        const endDate = new Date(campaign.endOn);

        // Nếu chiến dịch đã bị từ chối (status = 3), giữ nguyên trạng thái
        if (campaignStatus === 3) {
          return statusFilter === 3;
        }

        if (statusFilter === 1) {
          return campaignStatus === 1 && today >= startDate && today <= endDate;
        } else if (statusFilter === 0) {
          return campaignStatus === 0 || (campaignStatus === 1 && (today < startDate || today > endDate));
        } else {
          return campaignStatus === statusFilter;
        }
      }) || [];

  const isLoading = isAdmin ? isLoadingAdmin : isLoadingBrand;
  const campaigns = isAdmin
    ? {
        items: filteredAdminCampaigns,
        page: campaignsAdmin?.page || currentPage,
        totalPages: campaignsAdmin?.totalPages || 1,
        total: campaignsAdmin?.total || filteredAdminCampaigns.length,
      }
    : {
        items: filteredBrandCampaigns,
        page: brandPagination?.currentPage || currentPage,
        totalPages: brandPagination?.totalPages || 1,
        total: brandPagination?.totalItems || filteredBrandCampaigns.length,
      };
  const error = isAdmin ? errorAdmin : errorBrand;
  const refetch = isAdmin ? refetchAdmin : (newParams) => refetchBrand({ page: newParams?.page, size: newParams?.size, searchName: newParams?.search });

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