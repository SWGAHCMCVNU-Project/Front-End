// import { useQuery } from "@tanstack/react-query";
// import { getBrandById } from "../../store/api/apiBrands";

// export function useBrandWishlist(brandIds) {
//   const {
//     isLoading,
//     data: brandWishlistArray,
//     error,
//   } = useQuery({
//     queryKey: ["brandWishlist", brandIds],
//     queryFn: () =>
//       Promise.all(brandIds.map((brandId) => getBrandById(brandId))),
//     retry: false,
//   });

//   return { isLoading, error, brandWishlistArray };
// }
import { useQuery } from "@tanstack/react-query";
import { mockBrands } from "./mockStudents";

export function useBrandWishlist(brandIds) {
  const {
    isLoading,
    data: brandWishlistArray,
    error,
  } = useQuery({
    queryKey: ["brandWishlist", brandIds],
    queryFn: () =>
      Promise.all(brandIds.map((brandId) => 
        Promise.resolve(mockBrands.result.find(brand => brand.id === brandId))
      )),
    retry: false,
  });

  return { isLoading, error, brandWishlistArray };
}