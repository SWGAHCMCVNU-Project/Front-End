import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import { useCreateVoucherType } from "../../hooks/voucher-type/useCreateVoucherType";
import FileInput from "../../ui/FileInput";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

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
    const formData = {
      typeName: data.typeName?.trim() || "",
      description: data.description?.trim() || "",
      state: true,
    };

    if (!formData.typeName) {
      toast.error("Vui lòng nhập tên loại ưu đãi");
      return;
    }

    if (typeImage) {
      formData.image = typeImage;
    }

    createVoucherType(formData, {
      onSuccess: (response) => {
        if (response.status >= 200 && response.status < 300) {
          toast.success("Tạo loại ưu đãi thành công!");
          reset();
          onCloseModal?.(); // Đóng modal khi thành công
          queryClient.invalidateQueries(["voucherTypes"]);
        } else {
          toast.error(response.data?.message || "Có lỗi xảy ra khi tạo loại ưu đãi");
        }
      },
      onError: (error) => {
        console.error("Error creating voucher type:", error);
        toast.error(error.message || "Tạo loại ưu đãi thất bại. Vui lòng thử lại!");
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Tên loại ưu đãi" error={errors?.typeName?.message}>
        <StyledInput
          type="text"
          id="typeName"
          disabled={isCreating}
          {...register("typeName", { required: "Hãy nhập tên loại ưu đãi" })}
        />
      </FormRow>
      <FormRow label="Mô tả" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isCreating}
          {...register("description")}
        />
      </FormRow>
      <FormRow label="Hình ảnh" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          onChange={handleImageChange}
        />
        {typeImage && (
          <Button
            type="button"
            $variations="secondary"
            onClick={() => setTypeImage(null)}
          >
            Xóa ảnh
          </Button>
        )}
      </FormRow>
      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isCreating}>Tạo loại ưu đãi mới</Button>
      </FormRow>
    </Form>
  );
};

CreateVoucherTypeForm.propTypes = { onCloseModal: PropTypes.func };
export default CreateVoucherTypeForm;