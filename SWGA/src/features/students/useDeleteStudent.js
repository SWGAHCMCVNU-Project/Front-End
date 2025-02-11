// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { deleteStudentById } from "../../store/api/apiStudents";

// export function useDeleteStudent() {
//   const queryClient = useQueryClient();

//   const { isLoading: isDeleting, mutate: deleteStudent } = useMutation({
//     mutationFn: deleteStudentById,
//     onSuccess: () => {
//       toast.success("Xóa sinh viên thành công");
//       queryClient.invalidateQueries({
//         queryKey: ["students"],
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isDeleting, deleteStudent };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockStudents } from "./mockStudents";

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteStudent } = useMutation({
    mutationFn: (id) => {
      // Thay đổi state thành Inactive thay vì xóa
      const student = mockStudents.result.find(s => s.id === id);
      if (student) {
        student.state = "Inactive";
        student.stateName = "Không hoạt động";
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success("Vô hiệu hóa sinh viên thành công");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteStudent };
}

