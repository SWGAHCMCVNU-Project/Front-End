import { useQuery } from "@tanstack/react-query";
import { mockDataCampus } from "./mockDataCampus"; // Tạo mock data mới

export function useCampusStats() {
  const { isLoading, data: campusStats } = useQuery({
    queryFn: () => Promise.resolve(mockDataCampus.titles),
    queryKey: ["campusStats"],
  });

  return { isLoading, campusStats };
}