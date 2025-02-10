// import { useQuery } from "@tanstack/react-query";
// import storageService from "../../services/storageService";
// import { getDataColumnChart } from "../../store/api/apiDashboard";

// export function useDataColumnChart() {
//   const fromDate = "2024-03-12";
//   const toDate = "2024-03-20";
//   const adminId = storageService.getLoginId();

//   const { isLoading, data: dataColumnChartAdmin } = useQuery({
//     queryFn: () => getDataColumnChart(adminId, { fromDate, toDate }),
//     queryKey: ["dataColumnChartAdmin"],
//   });

//   return { isLoading, dataColumnChartAdmin };
// }
import { useQuery } from "@tanstack/react-query";
import { mockData } from "./mockData";

export function useDataColumnChart() {
  const { isLoading, data: dataColumnChartAdmin } = useQuery({
    queryFn: () => Promise.resolve(mockData.dataColumnChart),
    queryKey: ["dataColumnChartAdmin"],
  });

  return { isLoading, dataColumnChartAdmin };
}