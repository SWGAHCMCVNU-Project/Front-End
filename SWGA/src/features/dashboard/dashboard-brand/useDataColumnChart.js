// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../../services/storageService";
// import { getDataColumnChartBrand } from "../../../store/api/apiDashboard";

// export function useDataColumnChart() {
//   const fromDate = "2024-03-12";
//   const toDate = "2024-03-20";
//   const brandId = storageService.getLoginId();

//   const { isLoading, data: dataColumnChartBrand } = useQuery({
//     queryFn: () => getDataColumnChartBrand(brandId, { fromDate, toDate }),
//     queryKey: ["dataColumnChartBrand"],
//   });

//   return { isLoading, dataColumnChartBrand };
// }
import { useQuery } from "@tanstack/react-query";
import { mockDataColumnChart } from './mockData';

export function useDataColumnChart() {
  const { isLoading, data: dataColumnChartBrand } = useQuery({
    queryFn: () => Promise.resolve(mockDataColumnChart.result),
    queryKey: ["dataColumnChartBrand"],
  });

  return { isLoading, dataColumnChartBrand };
}