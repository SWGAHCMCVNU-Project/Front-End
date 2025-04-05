import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStoreAPI } from "../../store/api/storeApi";
import toast from "react-hot-toast";

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: ({ id, storeData }) => updateStoreAPI(id, storeData),
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
      queryClient.invalidateQueries(["store"]);
    },
    onError: (error) => {
      toast.error(errorMessage);
    },
  });

  return {
    editStore: mutate,
    isLoading,
    error,
  };
};