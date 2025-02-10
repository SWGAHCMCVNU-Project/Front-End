// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../services/storageService";
// import { getBeans } from "../../store/api/apiDashboard";

// export function useBeans() {
//   const adminId = storageService.getLoginId();
//   const { isLoading, data: beansAdmin } = useQuery({
//     queryFn: () => getBeans(adminId),
//     queryKey: ["beansAdmin"],
//   });

//   return { isLoading, beansAdmin };
// }
import { useQuery } from "@tanstack/react-query";
import { mockData } from "./mockData";

export function useBeans() {
  const { isLoading, data: beansAdmin } = useQuery({
    queryFn: () => Promise.resolve(mockData.beans),
    queryKey: ["beansAdmin"],
  });

  return { isLoading, beansAdmin };
}