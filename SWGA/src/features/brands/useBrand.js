// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { getBrandById } from "../../store/api/apiBrands";

// export function useBrand() {
//   const { brandId } = useParams();
//   const {
//     isLoading,
//     data: brand,
//     error,
//   } = useQuery({
//     queryKey: ["brand"],
//     queryFn: () => getBrandById(brandId),
//     retry: false,
//   });

//   return { isLoading, error, brand };
// }
import { useParams } from "react-router-dom";
import { mockBrands } from "./mockBrands";

export function useBrand() {
  const { brandId } = useParams();
  
  // Simulate API loading
  const isLoading = false;
  const error = null;
  const brand = mockBrands.result.find(b => b.id === Number(brandId));

  return { isLoading, error, brand };
}