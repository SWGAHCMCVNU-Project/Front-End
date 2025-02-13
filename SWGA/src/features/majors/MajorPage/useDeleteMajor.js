// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { deleteMajor } from "../../../store/api/apiMajors";

// export function useDeleteMajor() {
//     const queryClient = useQueryClient();
//     const [isModalVisible, setIsModalVisible] = useState(true);

//     const { isLoading: isDeleting, mutate: removeMajor } = useMutation({
//         mutationFn: deleteMajor,
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["majors"],
//             });
//             setIsModalVisible(false);
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     return { isDeleting, removeMajor, isModalVisible, setIsModalVisible };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { mockMajors } from "./mockMajors";

export function useDeleteMajor() {
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(true);

    const { isLoading: isDeleting, mutate: removeMajor } = useMutation({
        mutationFn: (id) => {
            // Thay đổi state thành false thay vì xóa
            const major = mockMajors.result.find(m => m.id === id);
            if (major) {
                major.state = false;
                major.stateName = "Không hoạt động";
            }
            return Promise.resolve();
        },
        onSuccess: () => {
            toast.success("Vô hiệu hóa chuyên ngành thành công");
            queryClient.invalidateQueries({
                queryKey: ["majors"],
            });
            setIsModalVisible(false);
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, removeMajor, isModalVisible, setIsModalVisible };
}

