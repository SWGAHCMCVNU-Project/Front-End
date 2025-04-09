import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.4rem;
  background-color: var(--color-grey-0);
  border-radius: 8px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  font-size: 1.4rem;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  font-size: 1.4rem;
  resize: vertical;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Checkbox = styled.input`
  width: 1.6rem;
  height: 1.6rem;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 0.8rem;
`;

const ErrorMessage = styled.span`
  color: var(--color-red-700);
  font-size: 1.2rem;
`;

function EditVoucherTypeForm({ voucherTypeToEdit, onSubmit, isLoading, onClose, onSuccess }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, watch, setValue } = useForm({
    defaultValues: {
      typeName: voucherTypeToEdit.typeName || "",
      description: voucherTypeToEdit.description || "",
      state: voucherTypeToEdit.state || false,
      image: voucherTypeToEdit.image || "",
    },
  });
  const { errors } = formState;
  const newImageFile = watch("newImageFile");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("newImageFile", file);
    }
  };

  const onFormSubmit = async (data) => {
    try {
      const submitData = {
        typeName: data.typeName?.trim() || "",
        description: data.description?.trim() || "",
        state: data.state,
        image: data.newImageFile || data.image,
      };

      if (!submitData.typeName) {
        toast.error("Vui lòng nhập tên loại ưu đãi");
        return;
      }

      if (!submitData.image && !data.newImageFile) {
        toast.error("Vui lòng upload hình ảnh");
        return;
      }

      const response = await onSubmit(voucherTypeToEdit.id, submitData);
      toast.success("Cập nhật loại ưu đãi thành công!");

      if (onSuccess) {
        onSuccess({
          id: voucherTypeToEdit.id,
          typeName: submitData.typeName,
          image: data.newImageFile ? URL.createObjectURL(data.newImageFile) : submitData.image,
          description: submitData.description,
          state: submitData.state,
        });
      }

      onClose();
      setTimeout(() => {
        navigate("/voucher-type");
      }, 100);
    } catch (err) {
      toast.error("Có lỗi khi cập nhật loại ưu đãi!");
      console.error("Error updating voucher type:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormRow>
        <Label>Tên loại ưu đãi *</Label>
        <Input
          name="typeName"
          disabled={isLoading}
          {...register("typeName", {
            required: "Hãy nhập tên loại ưu đãi",
            minLength: {
              value: 3,
              message: "Tên loại ưu đãi phải có ít nhất 3 ký tự",
            },
            maxLength: {
              value: 50,
              message: "Tên loại ưu đãi không được vượt quá 50 ký tự",
            },
          })}
        />
        {errors.typeName && <ErrorMessage>{errors.typeName.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Label>Ảnh hiện tại</Label>
        {newImageFile ? (
          <ImagePreview src={URL.createObjectURL(newImageFile)} alt="New Voucher Type Image" />
        ) : voucherTypeToEdit.image ? (
          <ImagePreview src={voucherTypeToEdit.image} alt="Current Voucher Type Image" />
        ) : (
          <p>Chưa có ảnh được chọn</p>
        )}
      </FormRow>

      <FormRow>
        <Label>Upload ảnh mới (* nếu thay đổi)</Label>
        <Input
          type="file"
          accept="image/*"
          disabled={isLoading}
          {...register("newImageFile", {
            validate: (value) =>
              voucherTypeToEdit.image || value ? true : "Hãy upload hình ảnh nếu chưa có ảnh hiện tại",
          })}
          onChange={handleFileChange}
        />
        {errors.newImageFile && <ErrorMessage>{errors.newImageFile.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Label>Mô tả *</Label>
        <Textarea
          name="description"
          disabled={isLoading}
          rows={3}
          {...register("description", {
            required: "Hãy nhập mô tả",
            minLength: {
              value: 3,
              message: "Mô tả phải có ít nhất 3 ký tự",
            },
            maxLength: {
              value: 50,
              message: "Mô tả không được vượt quá 50 ký tự",
            },
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            name="state"
            disabled={isLoading}
            {...register("state")}
          />
          <Label>Hoạt động</Label>
        </CheckboxWrapper>
      </FormRow>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : "Lưu thay đổi"}
      </Button>
    </Form>
  );
}

export default EditVoucherTypeForm;