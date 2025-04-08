import { useState } from "react";
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

function EditVoucherTypeForm({ voucherTypeToEdit, onSubmit, isLoading, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    typeName: voucherTypeToEdit.typeName || "",
    image: voucherTypeToEdit.image || "",
    description: voucherTypeToEdit.description || "",
    state: voucherTypeToEdit.state || false,
  });
  const [newImageFile, setNewImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        image: newImageFile || formData.image,
      };
      const response = await onSubmit(voucherTypeToEdit.id, submitData);
      toast.success("Cập nhật loại ưu đãi thành công!");

      // Gọi onSuccess để thông báo dữ liệu mới lên component cha
      if (onSuccess) {
        onSuccess({
          id: voucherTypeToEdit.id,
          typeName: submitData.typeName,
          image: newImageFile ? URL.createObjectURL(newImageFile) : submitData.image,
          description: submitData.description,
          state: submitData.state,
        });
      }

      // Đóng modal trước khi navigate
      onClose();
      // Navigate sau khi modal đóng
      setTimeout(() => {
        navigate("/voucher-type");
      }, 100);
    } catch (err) {
      toast.error("Có lỗi khi cập nhật loại ưu đãi!");
      console.error("Error updating voucher type:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label>Tên loại ưu đãi *</Label>
        <Input
          name="typeName"
          value={formData.typeName}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Label>Ảnh hiện tại</Label>
        {newImageFile ? (
          <ImagePreview src={URL.createObjectURL(newImageFile)} alt="New Voucher Type Image" />
        ) : formData.image ? (
          <ImagePreview src={formData.image} alt="Current Voucher Type Image" />
        ) : (
          <p>Chưa có ảnh được chọn</p>
        )}
      </FormRow>

      <FormRow>
        <Label>Upload ảnh mới (nếu muốn thay đổi)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Label>Mô tả</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            name="state"
            checked={formData.state}
            onChange={handleChange}
            disabled={isLoading}
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