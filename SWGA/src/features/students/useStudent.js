// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { getStudentById } from "../../store/api/apiStudents";

// export function useStudent() {
//   const { studentId } = useParams();
//   const {
//     isLoading,
//     data: student,
//     error,
//   } = useQuery({
//     queryKey: ["student"],
//     queryFn: () => getStudentById(studentId),
//     retry: false,
//   });

//   return { isLoading, error, student };
// }
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { mockStudents } from "./mockStudents";

export function useStudent() {
  const { studentId } = useParams();
  
  const {
    isLoading,
    data: student,
    error,
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => {
      const student = mockStudents.result.find(s => s.id === Number(studentId));
      return student;
    }
  });

  return { isLoading, error, student };
}