import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrandAPI } from "../../store/api/brandApi";
import toast from "react-hot-toast";
import { useBrand } from "./useBrand";

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const brandId = brand?.id;

  const { isLoading: isUpdating, mutate: updateBrand } = useMutation({
    mutationFn: ({ brandData }) => {
      if (!brandId) {
        throw new Error("Không tìm thấy Brand ID để cập nhật!");
      }

      // Log đầy đủ dữ liệu trước khi gửi
      console.log("Full brandData before sending to API:", {
        brandId,
        brandData: {
          brandName: brandData.brandName,
          acronym: brandData.acronym,
          address: brandData.address,
          coverPhoto: brandData.coverPhoto instanceof File ? brandData.coverPhoto.name : brandData.coverPhoto,
          coverFileName: brandData.coverFileName || "N/A",
          link: brandData.link,
          openingHours: brandData.openingHours,
          closingHours: brandData.closingHours,
          description: brandData.description,
          state: brandData.state,
          status: brandData.status || true,
          accountId: brand?.accountId || "N/A",
          totalIncome: brand?.totalIncome || "N/A",
          totalSpending: brand?.totalSpending || "N/A",
          dateCreated: brand?.dateCreated || "N/A",
          dateUpdated: brand?.dateUpdated || "N/A",
        },
      });

      return updateBrandAPI(brandId, brandData);
    },
    onSuccess: (data) => {
      console.log("Update successful, response data:", data);
      // Invalidate và refetch dữ liệu để đảm bảo BrandDataBox nhận được dữ liệu mới
      queryClient.invalidateQueries(["brand", brandId]); // Giả sử query key là ["brand", brandId]
      queryClient.refetchQueries(["brand", brandId]); // Thực hiện refetch ngay lập tức
      queryClient.invalidateQueries(["brands"]); // Cập nhật danh sách nếu cần
      toast.success("Cập nhật thương hiệu thành công!");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error(error.message || "Đã có lỗi xảy ra khi cập nhật thương hiệu!");
    },
  });

  const isLoading = isLoadingBrand || isUpdating;

  return { isLoading, updateBrand };
}