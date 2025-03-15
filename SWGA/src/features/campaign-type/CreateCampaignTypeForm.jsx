import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import { useCreateCampaignType } from "../../hooks/campaign-type/useCreateCampaignType"; // Updated import
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

const CreateCampaignTypeForm = ({ onCloseModal }) => {
  const { isCreating, createCampaignType } = useCreateCampaignType(); // Updated hook
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
      toast.error("Vui lòng nhập tên loại chiến dịch"); // Updated message
      return;
    }

    if (typeImage) {
      formData.image = typeImage;
      console.log("Image to be uploaded:", typeImage);
    }

    createCampaignType(formData, {
      onSuccess: (response) => {
        console.log("Create campaign type response:", response);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Tạo loại chiến dịch thành công!"); // Updated message (already handled in API, but kept for consistency)
          reset();
          onCloseModal?.();
          queryClient.invalidateQueries(["campaignTypes"]); // Updated query key
        } else {
          toast.error(response.data?.message || "Có lỗi xảy ra khi tạo loại chiến dịch");
        }
      },
      onError: (error) => {
        console.error("Error creating campaign type:", error);
        toast.error(error.message || "Tạo loại chiến dịch thất bại. Vui lòng thử lại!");
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Tên loại chiến dịch" error={errors?.typeName?.message}> {/* Updated label */}
        <StyledInput
          type="text"
          id="typeName"
          disabled={isCreating}
          {...register("typeName", { required: "Hãy nhập tên loại chiến dịch" })} 
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
        <Button disabled={isCreating}>Tạo loại chiến dịch mới</Button> {/* Updated button text */}
      </FormRow>
    </Form>
  );
};

CreateCampaignTypeForm.propTypes = { onCloseModal: PropTypes.func };
export default CreateCampaignTypeForm;