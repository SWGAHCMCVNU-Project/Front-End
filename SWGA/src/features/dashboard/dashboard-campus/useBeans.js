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
import { mockDataCampus } from "./mockDataCampus";

export function useBeans() {
  const { isLoading, data: beansCampus } = useQuery({
    queryFn: () => Promise.resolve(mockDataCampus.beans),
    queryKey: ["beansCampus"],
  });

  return { isLoading, beansCampus };
}