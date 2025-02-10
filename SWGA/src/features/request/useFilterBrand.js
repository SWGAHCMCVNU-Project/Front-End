// import { useQuery } from "@tanstack/react-query";
// import { getBrandFilter } from "../../store/api/apiBrands";

// export function useFilterBrand() {

//     const {
//         isLoading,
//         data: brands,
//         error
//     } = useQuery({
//         queryKey: ["brandFilter"],
//         queryFn: () => getBrandFilter()
//     });

//     return { isLoading, brands, error };
// }
import { mockBrands } from "../campaigns/CampaignPage/mockData";

export function useFilterBrand() {
    const isLoading = false;
    const error = null;
    
    // Sử dụng mock data từ mockData.js
    const brands = mockBrands;

    return { isLoading, brands, error };
}