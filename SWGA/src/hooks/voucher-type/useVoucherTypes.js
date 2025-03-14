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
    staleTime: 0, // Tắt staleTime để luôn gọi lại API
    refetchOnWindowFocus: true,
  });

  return { isLoading, error, voucherTypes: response };
}