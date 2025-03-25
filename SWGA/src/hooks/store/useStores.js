import { useQuery } from "@tanstack/react-query";
import { getAllStoresAPI } from "../../store/api/storeApi";
import { useBrand } from "../brand/useBrand";
import { toast } from "react-hot-toast";

export const useStores = ({
  searchName = "",
  page = 1,
  size = 100,
  state,
  areaId,
  sort,
} = {}) => {
  const { brand } = useBrand();
  const brandId = brand?.id;
  // console.log("useStores - brand:", brand);
  // console.log("useStores - brandId:", brandId);

  const params = {
    searchName,
    page,
    size,
    state,
    areaId,
    sort,
    ...(brandId && { brandId }),
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["stores", searchName, page, size, state, areaId, sort, brandId],
    queryFn: () => getAllStoresAPI(params),
    staleTime: 1000 * 60, // Cache trong 1 phút
    enabled: !!brandId, // Chỉ gọi API khi có brandId
    onError: (error) => {
      console.error("Error fetching stores:", error);
      toast.error("Không thể tải danh sách cửa hàng");
    },
    onSuccess: (responseData) => {
      console.log("Stores fetched successfully:", responseData);
    },
  });

  let stores = data?.data
    ? {
        result: data.data.items || [],
        currentPage: data.data.page || page,
        pageSize: data.data.size || size,
        pageCount: data.data.totalPages || 0,
        totalCount: data.data.total || 0,
      }
    : null;

  if (brandId && stores?.result?.length > 0) {
    stores.result = stores.result.filter((store) => store.brandId === brandId);
    stores.totalCount = stores.result.length;
    stores.pageCount = Math.ceil(stores.totalCount / stores.pageSize);
  }

  return { stores, error, isLoading };
};