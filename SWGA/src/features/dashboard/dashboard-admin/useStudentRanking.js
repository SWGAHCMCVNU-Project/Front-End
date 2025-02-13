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
import { mockData } from "./mockData";

export function useStudentRanking() {
  const { isLoading, data: studentRankingAdmin } = useQuery({
    queryFn: () => Promise.resolve(mockData.studentRanking),
    queryKey: ["studentRankingAdmin"],
  });

  return { isLoading, studentRankingAdmin };
}