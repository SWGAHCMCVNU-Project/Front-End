import { useMutation, useQueryClient } from "@tanstack/react-query";
import { distributePointsAPI } from "../../store/api/campusApi";
import toast from "react-hot-toast";

export const useDistributePoints = () => {
    const queryClient = useQueryClient();
  
    const { mutate: distributePoints, isDistributing, error } = useMutation({
      mutationFn: ({ campusId, lecturerIds, points }) => 
        distributePointsAPI(campusId, lecturerIds, points),
      onSuccess: (response) => {
        // Kích hoạt sự kiện cập nhật ví
        window.dispatchEvent(new CustomEvent('walletBalanceUpdated'));
        // Invalidate query để refetch dữ liệu
        queryClient.invalidateQueries({ queryKey: ["lecturers", "walletBalance"] });
        toast.success("Phân bổ điểm thành công!");
      },
      onError: (err) => {
        toast.error(err.message || "Lỗi khi phân bổ điểm");
      },
    });
  
    return { distributePoints, isDistributing, error };
  };