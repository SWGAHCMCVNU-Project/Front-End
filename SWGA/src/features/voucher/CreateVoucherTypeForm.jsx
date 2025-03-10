import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import { useCreateVoucherType } from "../../hooks/voucher-type/useCreateVoucherType";
import FileInput from "../../ui/FileInput";
import PropTypes from "prop-types";

const CreateVoucherTypeForm = ({ onCloseModal }) => {
  const { isCreating, createVoucherType } = useCreateVoucherType();
  const queryClient = useQueryClient();
  const [typeImage, setTypeImage] = useState(null);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { state: true },
  });
  const { errors } = formState;

  const handleImageChange = (e) => setTypeImage(e.target.files[0]);

  const onSubmit = (data) => {
    const formData = { typeName: data.typeName?.trim() || "", description: data.description?.trim() || "", state: true };
    if (typeImage) formData.image = typeImage;

    createVoucherType(formData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
        queryClient.invalidateQueries(["voucherTypes"]);
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Tên loại ưu đãi" error={errors?.typeName?.message}>
        <input type="text" id="typeName" disabled={isCreating} {...register("typeName", { required: "Hãy nhập tên loại ưu đãi" })} />
      </FormRow>
      <FormRow label="Mô tả" error={errors?.description?.message}>
        <Textarea id="description" disabled={isCreating} {...register("description")} />
      </FormRow>
      <FormRow label="Hình ảnh" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" disabled={isCreating} onChange={handleImageChange} />
        {typeImage && <Button type="button" $variations="secondary" onClick={() => setTypeImage(null)}>Xóa ảnh</Button>}
      </FormRow>
      <FormRow>
        <Button $variations="secondary" type="reset" disabled={isCreating} onClick={() => onCloseModal?.()}>Hủy bỏ</Button>
        <Button disabled={isCreating}>Tạo loại ưu đãi mới</Button>
      </FormRow>
    </Form>
  );
};

CreateVoucherTypeForm.propTypes = { onCloseModal: PropTypes.func };
export default CreateVoucherTypeForm;