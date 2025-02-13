// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../services/storageService";
// import { getTitles } from "../../store/api/apiDashboard";

// export function useTitles() {
//   const adminId = storageService.getLoginId();
//   const { isLoading, data: titlesAdmin } = useQuery({
//     queryFn: () => getTitles(adminId),
//     queryKey: ["titlesAdmin"],
//   });

//   return { isLoading, titlesAdmin };
// }
import { useQuery } from "@tanstack/react-query";
import { mockData } from "./mockData";

export function useTitles() {
  const { isLoading, data: titlesAdmin } = useQuery({
    queryFn: () => Promise.resolve(mockData.titles),
    queryKey: ["titlesAdmin"],
  });

  return { isLoading, titlesAdmin };
}