import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChallenge } from "../../store/api/challengeApi";

// Hook to update a challenge using react-query
export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, challengeData }) => {
      const response = await updateChallenge(id, challengeData);
      return response;
    },
    onSuccess: () => {
      // Làm mới danh sách thử thách ngay lập tức
      queryClient.invalidateQueries(["challenges"]);
    },
    onError: (err) => {
      console.error("Update challenge failed:", err);
    },
  });

  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending, // Sửa từ isLoading thành isPending
    error: mutation.error,
    data: mutation.data,
  };
};