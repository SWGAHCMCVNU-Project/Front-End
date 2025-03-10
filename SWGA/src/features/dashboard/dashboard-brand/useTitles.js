// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../../services/storageService";
// import { getTitlesBrand } from "../../../store/api/apiDashboard";

// export function useTitles() {
//   const brandId = storageService.getLoginId();
//   const { isLoading, data: titlesBrand } = useQuery({
//     queryFn: () => getTitlesBrand(brandId),
//     queryKey: ["titlesBrand"],
//   });

//   return { isLoading, titlesBrand };
// }
import { useQuery } from "@tanstack/react-query";
import { mockTitles } from './mockData';

export function useTitles() {
  const { isLoading, data: titles } = useQuery({
    queryFn: () => Promise.resolve(mockTitles.result),
    queryKey: ["titles"],
  });

  return { isLoading, titles };
}