import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import useGetVouchersByCampaignId from "../../../hooks/campaignDetail/useGetVouchersByCampaignId";

export function useCampaignVoucher() {
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 5);
  const [sort, setSort] = useState("Id,desc");
  const [state, setState] = useState(null);
  const [voucherTypesFilter, setVoucherTypesFilter] = useState([]);
  const [voucherTypesFilterValue, setVoucherTypesFilterValue] = useState(null);

  // Sử dụng hook useGetVouchersByCampaignId
  const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;
  const { vouchers, loading, error } = useGetVouchersByCampaignId(
    campaignId,
    search || "",
    page,
    limit
  );

  const value = {
    isLoading: loading,
    campaignVouchers: { result: vouchers }, // Định dạng lại để khớp với cấu trúc cũ
    error,
    state,
    setState,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    sort,
    setSort,
    voucherTypesFilter,
    voucherTypesFilterValue,
    setVoucherTypesFilter,
    setVoucherTypesFilterValue,
  };

  return value;
}

export function CampaignVoucherProvider({ children }) {
  return <PaginationContext.Provider value={useCampaignVoucher()}>{children}</PaginationContext.Provider>;
}