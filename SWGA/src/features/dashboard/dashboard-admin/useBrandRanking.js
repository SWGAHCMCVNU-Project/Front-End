// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../services/storageService";
// import { getBrandRanking } from "../../store/api/apiDashboard";

// export function useBrandRanking() {
//   const adminId = storageService.getLoginId();
//   const { isLoading, data: brandRankingAdmin } = useQuery({
//     queryFn: () => getBrandRanking(adminId),
//     queryKey: ["brandRankingAdmin"],
//   });

//   return { isLoading, brandRankingAdmin };
// }
import { useQuery } from "@tanstack/react-query";
import { mockData } from "./mockData";

export function useBrandRanking() {
  const { isLoading, data: brandRankingAdmin } = useQuery({
    queryFn: () => Promise.resolve(mockData.brandRanking),
    queryKey: ["brandRankingAdmin"],
  });

  return { isLoading, brandRankingAdmin };
}