// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { deleteUniversity } from "../../../store/api/apiUniversities";

// export function useDeleteUniversity() {
//     const queryClient = useQueryClient();
//     const [isModalVisible, setIsModalVisible] = useState(true);

//     const { isLoading: isDeleting, mutate: removeUniversity } = useMutation({
//         mutationFn: deleteUniversity,
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["universities"],
//             });
//             setIsModalVisible(false);
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     return { isDeleting, removeUniversity, isModalVisible, setIsModalVisible };
// }
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { mockUniversities } from "./mockUniversity";

export function useDeleteUniversity() {
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(true);

    const { isLoading: isDeleting, mutate: removeUniversity } = useMutation({
        mutationFn: (id) => {
            // Thay đổi state thành false thay vì xóa
            const university = mockUniversities.result.find(u => u.id === id);
            if (university) {
                university.state = false;
                university.stateName = "Không hoạt động";
            }
            return Promise.resolve();
        },
        onSuccess: () => {
            toast.success("Vô hiệu hóa trường đại học thành công");
            queryClient.invalidateQueries({
                queryKey: ["universities"],
            });
            setIsModalVisible(false);
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, removeUniversity, isModalVisible, setIsModalVisible };
}

