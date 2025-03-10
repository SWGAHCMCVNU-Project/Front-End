import { useQuery } from "@tanstack/react-query";
import { mockDataCampus } from "./mockDataCampus";

export function useLecturerRanking() {
  const { isLoading, data: lecturerRankingCampus } = useQuery({
    queryFn: () => Promise.resolve(mockDataCampus.lecturerRanking),
    queryKey: ["lecturerRankingCampus"],
  });

  return { isLoading, lecturerRankingCampus };
}