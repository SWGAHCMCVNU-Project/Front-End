import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import useGetAllCampaigns from "../../../hooks/campaign/useGetAllCampaigns";
import { useTablePagination } from "../../../hooks/useTablePagination";

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

  const search = searchParams.get("search") || null;
  const brandIds = searchParams.get("brandIds") ? searchParams.get("brandIds").split(",") : null;
  const campaignTypeIds = searchParams.get("campaignTypeIds") ? searchParams.get("campaignTypeIds").split(",") : null;

  console.log('Params in CampaignProvider:', { search, brandIds, campaignTypeIds, statesFilterValue });

  const {
    isLoading,
    data: campaigns,
    error
  } = useGetAllCampaigns({
    sort,
    search,
    page: currentPage,
    size: initialSize,
    brandIds,
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

  const mappedCampaigns = campaigns
    ? { result: campaigns.items || [], totalCount: campaigns.total || 0 }
    : { result: [], totalCount: 0 };

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
    setStatesFilterValue
  };

  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}