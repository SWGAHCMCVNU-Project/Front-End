import { useQuery } from "@tanstack/react-query";
import { getCampusesFilter } from "../../store/api/apiCampuses";

export function useCampuses(universityIds) {
  const {
    isLoading,
    data: campuses,
    error,
  } = useQuery({
    queryKey: ["campuses", universityIds],
    queryFn: () => getCampusesFilter(universityIds),
  });

  return { isLoading, error, campuses };
}
