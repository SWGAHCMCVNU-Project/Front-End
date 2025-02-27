// import { useQuery } from "@tanstack/react-query";
// import { getUniversitiesFilter } from "../../store/api/apiUniversities";

// export function useUniversitiesFilter() {
//   const {
//     isLoading,
//     data: universitiesFilter,
//     error,
//   } = useQuery({
//     queryKey: ["universitiesFilter"],
//     queryFn: () => getUniversitiesFilter(),
//   });

//   return { isLoading, error, universitiesFilter };
// }
import { useQuery } from "@tanstack/react-query";
import { mockUniversities } from "./mockLecturers";

export function useUniversitiesFilter() {
  const {
    isLoading,
    data: universitiesFilter,
    error,
  } = useQuery({
    queryKey: ["universitiesFilter"],
    queryFn: () => mockUniversities,
  });

  return { isLoading, error, universitiesFilter };
}

