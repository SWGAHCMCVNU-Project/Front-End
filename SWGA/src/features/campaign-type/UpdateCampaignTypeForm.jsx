import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { useUpdateCampaignType } from "../../hooks/campaign-type/useUpdateCampaignType";
import logoDefault from "../../assets/images/brand.png"; // Default image if needed

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const UpdateCampaignTypeForm = ({ campaignTypeToEdit, onCloseModal }) => {
  const { id, typeName, description, image, state } = campaignTypeToEdit || {};
  const { isUpdating, updateCampaignType } = useUpdateCampaignType();
  const queryClient = useQueryClient();
  const [typeImage, setTypeImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(image || logoDefault);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      typeName: typeName || "",
      description: description || "",
      state: state ?? true,
    },
  });
  const { errors } = formState;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTypeImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(image || logoDefault);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      id,
      typeName: data.typeName?.trim() || "",
      description: data.description?.trim() || "",
      state: data.state ?? true,
      image: typeImage || undefined, // Only include image if a new one is uploaded
    };

    if (!formData.typeName) {
      toast.error("Vui lòng nhập tên loại chiến dịch");
      return;
    }

    updateCampaignType(formData, {
      onSuccess: (response) => {
        if (response.status >= 200 && response.status < 300) {
          toast.success("Cập nhật loại chiến dịch thành công!");
          reset();
          onCloseModal?.();
          queryClient.invalidateQueries(["campaignTypes"]);
        } else {
          toast.error(response.data?.message || "Có lỗi xảy ra khi cập nhật loại chiến dịch");
        }
      },
      onError: (error) => {
        console.error("Error updating campaign type:", error);
        toast.error(error.message || "Cập nhật loại chiến dịch thất bại. Vui lòng thử lại!");
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Tên loại chiến dịch" error={errors?.typeName?.message}>
        <StyledInput
          type="text"
          id="typeName"
          disabled={isUpdating}
          {...register("typeName", { required: "Hãy nhập tên loại chiến dịch" })}
        />
      </FormRow>
      <FormRow label="Mô tả" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isUpdating}
          {...register("description")}
        />
      </FormRow>
      <FormRow label="Hình ảnh" error={errors?.image?.message}>
        <div>
          <PreviewImage src={previewImage} alt="Preview" />
          <FileInput
            id="image"
            accept="image/*"
            disabled={isUpdating}
            onChange={handleImageChange}
          />
          {typeImage && (
            <Button
              type="button"
              $variations="secondary"
              onClick={() => {
                setTypeImage(null);
                setPreviewImage(image || logoDefault);
              }}
            >
              Xóa ảnh mới
            </Button>
          )}
        </div>
      </FormRow>
      <FormRow label="Trạng thái">
        <StyledInput
          type="checkbox"
          id="state"
          disabled={isUpdating}
          {...register("state")}
        />
      </FormRow>
      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isUpdating}
          onClick={() => onCloseModal?.()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isUpdating}>Cập nhật loại chiến dịch</Button>
      </FormRow>
    </Form>
  );
};

UpdateCampaignTypeForm.propTypes = {
  campaignTypeToEdit: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func,
};

export default UpdateCampaignTypeForm;