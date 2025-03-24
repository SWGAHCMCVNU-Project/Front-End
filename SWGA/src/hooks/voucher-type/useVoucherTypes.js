import { useQuery } from "@tanstack/react-query";
import { getVoucherTypesAPI } from "../../store/api/voucherTypeApi";

export function useVoucherTypes({
  page = 1,
  size = 100,
  search = "",
  state = true,
  isAsc = true,
} = {}) {
  const { isLoading, data: response, error } = useQuery({
    queryKey: ["voucherTypes", page, size, search, state, isAsc],
    queryFn: () =>
      getVoucherTypesAPI({ page, size, search, state, isAsc }),
    staleTime: 1000 * 60, // 1 phút
    refetchOnWindowFocus: false, // Tắt refetch khi focus
  });

  console.log("useVoucherTypes response:", response);

  return { isLoading, error, voucherTypes: response };
}