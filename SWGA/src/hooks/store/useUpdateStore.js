import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStoreAPI } from "../../store/api/storeApi";
import toast from "react-hot-toast";

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: ({ id, storeData }) => updateStoreAPI(id, storeData),
    onSuccess: () => {
      toast.success("Cập nhật cửa hàng thành công!");
      queryClient.invalidateQueries(["stores"]);
      queryClient.invalidateQueries(["store"]);
    },
    onError: (error) => {
      const errorMessage = error.message || "Cập nhật cửa hàng thất bại";
      toast.error(errorMessage);
    },
  });

  return {
    editStore: mutate,
    isLoading,
    error,
  };
};