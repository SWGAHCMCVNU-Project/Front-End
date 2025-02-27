// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../services/storageService";
// import { getStudentRanking } from "../../store/api/apiDashboard";

// export function useStudentRanking() {
//   const adminId = storageService.getLoginId();
//   const { isLoading, data: studentRankingAdmin } = useQuery({
//     queryFn: () => getStudentRanking(adminId),
//     queryKey: ["studentRankingAdmin"],
//   });

//   return { isLoading, studentRankingAdmin };
// }
import { useQuery } from "@tanstack/react-query";
import { mockDataCampus } from "./mockDataCampus";

export function useStudentRanking() {
  const { isLoading, data: studentRankingCampus } = useQuery({
    queryFn: () => Promise.resolve(mockDataCampus.studentRanking),
    queryKey: ["studentRankingCampus"],
  });

  return { isLoading, studentRankingCampus };
}