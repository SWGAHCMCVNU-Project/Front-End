// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../../services/storageService";
// import { getBeansBrand } from "../../../store/api/apiDashboard";

// export function useBeans() {
//   const brandId = storageService.getLoginId();
//   const { isLoading, data: beansBrand } = useQuery({
//     queryFn: () => getBeansBrand(brandId),
//     queryKey: ["beansBrand"],
//   });

//   return { isLoading, beansBrand };
// }
import { useQuery } from "@tanstack/react-query";
import { mockBeansBrand } from './mockData';

export function useBeans() {
  const { isLoading, data: beansBrand } = useQuery({
    queryFn: () => Promise.resolve(mockBeansBrand),
    queryKey: ["beansBrand"],
  });

  return { isLoading, beansBrand };
}