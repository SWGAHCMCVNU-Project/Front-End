import { useQuery } from "@tanstack/react-query";
import { getVouchersAPI } from "../../store/api/voucherApi";
import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";

export function useVouchers({ page = 1, size = 100, search = "", state = true, isAsc = true } = {}) {
    const { brand } = useBrand();
    const brandId = brand?.id || "";
    // console.log("Brand:", brand, "BrandId:", brandId); // Debug brand và brandId


    const { isLoading, data: vouchers, error } = useQuery({
        queryKey: ["vouchers", page, size, search, state, isAsc, brandId],
        queryFn: () => getVouchersAPI({ page, size, search, state, isAsc, brandId }),
        enabled: !!brandId, // Giữ điều kiện này vì brandId là bắt buộc
        staleTime: 1000 * 60,
        onError: () => toast.error("Không thể tải danh sách phiếu ưu đãi"),
    });

    // console.log("Vouchers from useVouchers:", vouchers); // Debug dữ liệu vouchers
    return { isLoading, vouchers, error };
}