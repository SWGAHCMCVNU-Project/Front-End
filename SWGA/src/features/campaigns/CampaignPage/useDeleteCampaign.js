// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { deleteCampaign } from "../../../store/api/apiCampaigns";

// export function useDeleteCampaign() {
//     const queryClient = useQueryClient();
//     const [isModalVisible, setIsModalVisible] = useState(true);

//     const { isLoading: isDeleting, mutate: removeCampaign } = useMutation({
//         mutationFn: deleteCampaign,
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["campaigns"],
//             });
//             setIsModalVisible(false);
//         },
//         onError: (err) => toast.error(err.message),
//     });

//     return { isDeleting, removeCampaign, isModalVisible, setIsModalVisible };
// }
import { useState } from "react";
import toast from "react-hot-toast";

export function useDeleteCampaign() {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const removeCampaign = async (id) => {
        setIsDeleting(true);
        try {
            // Giả lập xóa campaign
            console.log(`Đã xóa campaign có id: ${id}`);
            toast.success("Xóa chiến dịch thành công!");
            setIsModalVisible(false);
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa chiến dịch!");
        } finally {
            setIsDeleting(false);
        }
    };

    return { isDeleting, removeCampaign, isModalVisible, setIsModalVisible };
}