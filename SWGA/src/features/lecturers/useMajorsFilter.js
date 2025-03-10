// import { useQuery } from "@tanstack/react-query";
// import { getMajorsFilter } from "../../store/api/apiMajors";

// export function useMajorsFilter() {
//   const {
//     isLoading,
//     data: majorsFilter,
//     error,
//   } = useQuery({
//     queryKey: ["majorsFilter"],
//     queryFn: () => getMajorsFilter(),
//   });

//   return { isLoading, error, majorsFilter };
// }
import { useQuery } from "@tanstack/react-query";
import { mockMajors } from "./mockLecturers";

export function useMajorsFilter() {
  const {
    isLoading,
    data: majorsFilter,
    error,
  } = useQuery({
    queryKey: ["majorsFilter"],
    queryFn: () => mockMajors,
  });

  return { isLoading, error, majorsFilter };
}

