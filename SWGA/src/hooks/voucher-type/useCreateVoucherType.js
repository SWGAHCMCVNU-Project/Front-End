import { useMutation } from "@tanstack/react-query";
import { createVoucherTypeAPI } from "../../store/api/voucherTypeApi";

export function useCreateVoucherType() {
  const { mutate: createVoucherType, isLoading: isCreating, error } = useMutation({
    mutationFn: (data) => createVoucherTypeAPI(data),
  });

  return { isCreating, createVoucherType, error };
}