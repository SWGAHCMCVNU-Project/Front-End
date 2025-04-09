import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { CustomFormRow } from "../../ui/custom/Form/InputItem/CustomFormItem";
import Input from "../../ui/Input";
import useCreateLuckyPrize from "../../hooks/lucky-prize/useCreateLuckyPrize";
import useUpdateLuckyPrize from "../../hooks/lucky-prize/useUpdateLuckyPrize";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

function CreateLuckyPrizeForm({ prizeToEdit = {}, onCloseModal, onSuccess }) {
  const { isCreating, createPrize } = useCreateLuckyPrize();
  const { isUpdating, updatePrize } = useUpdateLuckyPrize();
  const isWorking = isCreating || isUpdating;
  const isEditSession = Boolean(prizeToEdit.id);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? prizeToEdit : {},
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    const processedData = {
      ...data,
      probability: Number(data.probability),
      quantity: Number(data.quantity),
      status: true,
    };

    if (isEditSession) {
      await updatePrize(
        {
          id: prizeToEdit.id.toString(),
          newData: processedData,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật giải thưởng thành công");
            reset();
            onCloseModal?.();
            onSuccess?.(); // Gọi refetch cho edit
          },
          onError: (error) => {
            toast.error(error.message || "Cập nhật thất bại");
          },
        }
      );
    } else {
      await createPrize(processedData, {
        onSuccess: (newPrize) => {
          toast.success("Tạo giải thưởng thành công");
          reset();
          onCloseModal?.();
          onSuccess?.(newPrize); // Truyền dữ liệu mới để thêm vào danh sách
        },
        onError: (error) => {
          toast.error(error.message || "Tạo giải thưởng thất bại");
        },
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <CustomFormRow label="Tên giải thưởng" error={errors?.prizeName?.message}>
        <Input
          type="text"
          id="prizeName"
          disabled={isWorking}
          {...register("prizeName", {
            required: "Yêu cầu nhập tên giải thưởng",
            minLength: {
              value: 3,
              message: "Tên giải thưởng phải ít nhất 3 kí tự",
            },
            maxLength: {
              value: 50,
              message: "Tên giải thưởng tối đa 50 kí tự",
            },
          })}
        />
      </CustomFormRow>
      <CustomFormRow label="Xác suất (%)" error={errors?.probability?.message}>
        <Input
          type="number"
          id="probability"
          disabled={isWorking}
          step="0.01"
          {...register("probability", {
            required: "Yêu cầu nhập xác suất",
            min: { value: 0, message: "Xác suất tối thiểu 0%" },
            max: { value: 100, message: "Xác suất tối đa 100%" },
            validate: (value) =>
              !isNaN(parseFloat(value)) || "Giá trị phải là số hợp lệ",
          })}
        />
      </CustomFormRow>
      <CustomFormRow label="Số lượng" error={errors?.quantity?.message}>
        <Input
          type="number"
          id="quantity"
          disabled={isWorking}
          {...register("quantity", {
            required: "Yêu cầu nhập số lượng",
            min: { value: 0, message: "Số lượng không được âm" },
          })}
        />
      </CustomFormRow>

      <CustomFormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={onCloseModal}
          disabled={isWorking}
        >
          Hủy
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Cập nhật" : "Tạo mới"}
        </Button>
      </CustomFormRow>
    </Form>
  );
}

CreateLuckyPrizeForm.propTypes = {
  prizeToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
  onSuccess: PropTypes.func,
};

CreateLuckyPrizeForm.defaultProps = {
  prizeToEdit: {},
  onCloseModal: () => {},
  onSuccess: () => {},
};

export default CreateLuckyPrizeForm;