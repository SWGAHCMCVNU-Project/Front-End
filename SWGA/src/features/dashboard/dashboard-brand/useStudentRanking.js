// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../../services/storageService";
// import { getStudentRankingByBrandId } from "../../../store/api/apiDashboard";

// export function useStudentRanking() {
//   const brandId = storageService.getLoginId();
//   const { isLoading, data: studentRankingBrand } = useQuery({
//     queryFn: () => getStudentRankingByBrandId(brandId),
//     queryKey: ["studentRankingBrand"],
//   });

//   return { isLoading, studentRankingBrand };
// }
import { useQuery } from "@tanstack/react-query";
import { mockStudentRanking } from './mockData';

export function useStudentRanking() {
  const { isLoading, data: studentRankingBrand } = useQuery({
    queryFn: () => Promise.resolve(mockStudentRanking.result),
    queryKey: ["studentRankingBrand"],
  });

  return { isLoading, studentRankingBrand };
}