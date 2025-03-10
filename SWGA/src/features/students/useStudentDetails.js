// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { updateStudentState } from "../../store/api/apiStudents";
// import { useParams, useSearchParams } from "react-router-dom";

// export function useEditStudentState() {
//   const queryClient = useQueryClient();
//   const { studentId } = useParams();
//   const [searchParams] = useSearchParams();

//   //REASON
//   const reason =
//     searchParams.get("reason") !== "" ? searchParams.get("reason") : null;

//   const { mutate: editStudentState, isLoading: isEditingState } = useMutation({
//     mutationFn: (stateId) => updateStudentState(studentId, stateId, reason),
//     onSuccess: () => {
//       toast.success("Cập nhật trạng thái sinh viên thành công");
//       queryClient.invalidateQueries({ queryKey: ["students"] });
//       queryClient.refetchQueries({
//         queryKey: ["student"],
//         specificKey: studentId,
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isEditingState, editStudentState };
// }
import { useQuery } from "@tanstack/react-query";
import { mockStudents } from "./mockStudents";

export function useStudentDetails() {
  const {
    isLoading,
    data: students,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => Promise.resolve(mockStudents),
  });

  return { isLoading, error, students };
}