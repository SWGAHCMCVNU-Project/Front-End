import { useMutation } from "@tanstack/react-query";
import voucherTypeService from "../../services/voucherTypeService";

export function useCreateVoucherType() {
  const { mutate: createVoucherType, isLoading: isCreating, error } = useMutation({
    mutationFn: (data) => voucherTypeService.createVoucherType(data),
  });

  return { isCreating, createVoucherType, error };
}