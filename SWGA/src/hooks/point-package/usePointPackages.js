import { useQuery } from "@tanstack/react-query";
import { getAllPointPackages } from "../../store/api/pointPackageApi"; // Đường dẫn tới file API

export const usePointPackages = ({
  page = 1,
  size = 10,
  searchName = "",
  status = null,
  isAsc = true,
} = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pointPackages", { page, size, searchName, status, isAsc }],
    queryFn: () =>
      getAllPointPackages({
        page,
        size,
        searchName,
        status,
        isAsc,
      }),
    keepPreviousData: true, // Giữ dữ liệu cũ khi đang tải dữ liệu mới (cho phân trang)
  });

  return {
    pointPackages: data, // Dữ liệu trả về từ API
    error,
    isLoading,
  };
};