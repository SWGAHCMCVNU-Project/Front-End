import { useQuery } from "@tanstack/react-query";
import { getVoucherTypesAPI } from "../../store/api/voucherTypeApi"; // Sửa thành named import

export function useVoucherTypes({ page = 1, size = 100, search = "", state = true, isAsc = true } = {}) {
  const { isLoading, data: response, error } = useQuery({
    queryKey: ["voucherTypes", page, size, search, state, isAsc],
    queryFn: () => getVoucherTypesAPI({ page, size, search, state, isAsc }), // Sửa cú pháp gọi hàm
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  return { isLoading, error, voucherTypes: response };
}