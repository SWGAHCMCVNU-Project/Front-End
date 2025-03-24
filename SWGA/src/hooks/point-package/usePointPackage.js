import { useQuery } from "@tanstack/react-query";
import { getPointPackageById } from "../../store/api/pointPackageApi"; // Đường dẫn tới file API

export const usePointPackage = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pointPackage", id],
    queryFn: () => getPointPackageById(id),
    enabled: !!id, // Chỉ chạy query nếu có ID
  });

  return {
    pointPackage: data?.data, // Dữ liệu gói điểm cụ thể
    error,
    isLoading,
  };
};