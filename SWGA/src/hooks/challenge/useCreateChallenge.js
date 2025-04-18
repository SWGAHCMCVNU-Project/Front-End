import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChallenge } from "../../store/api/challengeApi";

// Hook to create a challenge using react-query
export const useCreateChallenge = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (challengeData) => {
      const response = await createChallenge(challengeData);
      return response;
    },
    onSuccess: () => {
      // Làm mới danh sách thử thách ngay lập tức
      queryClient.invalidateQueries(["challenges"]);
    },
    onError: (err) => {
      console.error("Create challenge failed:", err);
    },
    onSettled: () => {
    },
  });

  return {
    create: mutation.mutateAsync,
    loading: mutation.isPending, // Sửa từ isLoading thành isPending
    error: mutation.error,
    data: mutation.data,
  };
};