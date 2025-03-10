// import { useQuery } from "@tanstack/react-query";
// import { getAreaFilter } from "../../../../../store/api/apiAreas";

// export function useAreaFilter() {
//     const {
//         isLoading,
//         data: areas,
//         error,
//     } = useQuery({
//         queryKey: ["areaFilter"],
//         queryFn: () => getAreaFilter(),
//     });

//     return { isLoading, error, areas };
// }
import { useQuery } from "@tanstack/react-query";
import { mockUniversities } from "../UniversityPage/mockUniversity";  // Import từ cùng thư mục

export function useAreaFilter() {
    const {
        isLoading,
        data: areas,
        error,
    } = useQuery({
        queryKey: ["areaFilter"],
        queryFn: () => Promise.resolve(mockUniversities.result),
    });

    return { isLoading, error, areas };
}