import { useQuery } from "@tanstack/react-query";
import { getPointPackageById } from "../../store/api/pointPackageApi";
import { toast } from "react-hot-toast";

export const usePointPackage = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pointPackage", id],
    queryFn: () => getPointPackageById(id),
    enabled: !!id,
    onError: () => toast.error("Không thể tải thông tin gói điểm"),
  });

  const pointPackage = data?.data || null;

  return {
    pointPackage,
    error,
    isLoading,
  };
}; 