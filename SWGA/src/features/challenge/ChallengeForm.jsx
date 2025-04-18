import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { useCreateChallenge } from "../../hooks/challenge/useCreateChallenge";
import { useUpdateChallenge } from "../../hooks/challenge/useUpdateChallenge";
import { Spin } from "antd";
import "antd/dist/reset.css";

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const StyledSelect = styled.select`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const StyledButton = styled(Button)`
  padding: 0.6rem 1rem;
  font-size: 1.2rem;
  border-radius: 5px;
  width: fit-content;
  text-align: center;

  &[data-variation="secondary"] {
    background-color: var(--color-grey-200);
    color: var(--color-grey-700);
    border: 1px solid var(--color-grey-300);
  }
`;

const ChallengeForm = ({ challengeToEdit = {}, onCloseModal }) => {
  const { id: editId, challengeName, amount, condition = 0, type, image, description, status, category } = challengeToEdit;
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient();
  const { create, loading: isCreating } = useCreateChallenge();
  const { update, loading: isUpdating } = useUpdateChallenge();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? { type, challengeName, amount, condition, image: null, description, status, category }
      : { type: 1, status: true, category: "" },
  });
  const { errors } = formState;

  const isWorking = isCreating || isUpdating;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("type", Number(data.type));
    formData.append("challengeName", data.challengeName?.trim() || "");
    formData.append("amount", Number(data.amount));
    formData.append("condition", Number(data.condition));
    if (data.image && data.image[0]) formData.append("image", data.image[0]);
    formData.append("description", data.description?.trim() || "");
    formData.append("status", data.status ?? true);
    formData.append("category", data.category?.trim() || "");

    if (!formData.get("challengeName")) {
      toast.error("Vui lòng nhập tên thử thách");
      return;
    }
    if (!formData.get("category")) {
      toast.error("Vui lòng nhập danh mục");
      return;
    }

    try {
      if (isEditSession) {
        await update({ id: editId, challengeData: formData });
        toast.success("Cập nhật thử thách thành công!");
      } else {
        await create(formData);
        toast.success("Tạo thử thách thành công!");
      }
      reset();
      queryClient.invalidateQueries(["challenges"]);
      onCloseModal?.();
    } catch (err) {
      toast.error(
        `${isEditSession ? "Cập nhật" : "Tạo"} thử thách thất bại: ${err.message || "Có lỗi xảy ra"}`
      );
    }
  };

  const handleCancel = () => {
    reset();
    onCloseModal?.();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Loại thử thách" error={errors?.type?.message}>
        <StyledSelect id="type" disabled={isWorking} {...register("type", { required: "Hãy chọn loại thử thách" })}>
          <option value={1}>Hằng ngày</option>
          <option value={2}>Thành tựu</option>
        </StyledSelect>
      </FormRow>
      <FormRow label="Danh mục" error={errors?.category?.message}>
        <StyledInput
          type="text"
          id="category"
          disabled={isWorking}
          {...register("category", {
            required: "Hãy nhập danh mục",
            minLength: { value: 3, message: "Danh mục ít nhất 3 ký tự" },
            maxLength: { value: 50, message: "Danh mục tối đa 50 ký tự" },
          })}
        />
      </FormRow>
      <FormRow label="Tên thử thách" error={errors?.challengeName?.message}>
        <StyledInput
          type="text"
          id="challengeName"
          disabled={isWorking}
          {...register("challengeName", {
            required: "Hãy nhập tên thử thách",
            minLength: { value: 3, message: "Tên thử thách ít nhất 3 ký tự" },
            maxLength: { value: 100, message: "Tên thử thách tối đa 100 ký tự" },
          })}
        />
      </FormRow>
      <FormRow label="Thưởng" error={errors?.amount?.message}>
        <StyledInput
          type="number"
          id="amount"
          disabled={isWorking}
          {...register("amount", {
            required: "Hãy nhập số lượng",
            min: { value: 0, message: "Số lượng phải không âm (≥ 0)" },
          })}
        />
      </FormRow>
      <FormRow label="Điều kiện (Condition)" error={errors?.condition?.message}>
        <StyledInput
          type="number"
          id="condition"
          disabled={isWorking}
          {...register("condition", {
            required: "Hãy nhập điều kiện",
            valueAsNumber: true,
            min: { value: 1, message: "Điều kiện phải lớn hơn 0" },
          })}
        />
      </FormRow>
      <FormRow label="Hình ảnh" error={errors?.image?.message}>
        <StyledInput
          type="file"
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "Hãy chọn hình ảnh",
          })}
        />
      </FormRow>
      <FormRow label="Mô tả" error={errors?.description?.message}>
        <StyledTextarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "Hãy nhập mô tả",
            minLength: { value: 3, message: "Mô tả ít nhất 3 ký tự" },
            maxLength: { value: 500, message: "Mô tả tối đa 500 ký tự" },
          })}
        />
      </FormRow>
      {isEditSession && (
        <FormRow label="Trạng thái">
          <StyledInput type="checkbox" id="status" disabled={isWorking} {...register("status")} />
        </FormRow>
      )}
      <FormRow>
        <StyledButton $variations="secondary" type="button" disabled={isWorking} onClick={handleCancel}>
          Hủy bỏ
        </StyledButton>
        <StyledButton disabled={isWorking}>
          {isWorking ? <Spin size="small" /> : <span>{isEditSession ? "Cập nhật thử thách" : "Tạo thử thách mới"}</span>}
        </StyledButton>
      </FormRow>
    </Form>
  );
};

ChallengeForm.propTypes = {
  challengeToEdit: PropTypes.shape({
    id: PropTypes.string,
    challengeName: PropTypes.string,
    amount: PropTypes.number,
    condition: PropTypes.number,
    type: PropTypes.number,
    image: PropTypes.any,
    description: PropTypes.string,
    status: PropTypes.bool,
    category: PropTypes.string,
  }),
  onCloseModal: PropTypes.func,
};

export default ChallengeForm;