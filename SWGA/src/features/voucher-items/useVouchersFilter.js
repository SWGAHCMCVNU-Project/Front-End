// import { useQuery } from "@tanstack/react-query";
// import { getVouchersFilter } from "../../store/api/apiVouchers";
// import storageService from "../../services/storageService";

// export function useVouchersFilter() {
//   const brandIds = storageService.getLoginId();
//   const {
//     isLoading,
//     data: vouchersFilter,
//     error,
//   } = useQuery({
//     queryKey: ["vouchersFilter"],
//     queryFn: () => getVouchersFilter({ brandIds }),
//   });

//   return { isLoading, error, vouchersFilter };
// }
import { useQuery } from "@tanstack/react-query";
import { mockVouchersFilter } from "./mockVoucherItems";

export function useVouchersFilter() {
  const {
    isLoading,
    data: vouchersFilter,
    error,
  } = useQuery({
    queryKey: ["vouchersFilter"],
    queryFn: () => mockVouchersFilter,
  });

  return { isLoading, error, vouchersFilter };
}