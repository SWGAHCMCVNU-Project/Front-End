import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import { SelectForm } from "../../ui/custom/Select/SelectBox/SelectForm";
import { useCreateVoucherItem } from "../../hooks/voucher-item/useCreateVoucherItem";
import FileInput from "../../ui/FileInput";
import storageService from "../../services/storageService";

const InputPriceUnit = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

function CreateVoucherItemForm({ onCloseModal }) {
  const { isCreating, createVoucherItem } = useCreateVoucherItem();
  const queryClient = useQueryClient();
  const [voucherImage, setVoucherImage] = useState(null);
  const [typeId, setTypeId] = useState("");

  const { register, handleSubmit, reset, setValue, formState } = useForm({
    defaultValues: {
      state: true
    }
  });
  const { errors } = formState;

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setVoucherImage(selectedFile);
  };

  const validatePrice = (value) => {
    if (!value) return "Hãy nhập giá";
    if (isNaN(value) || parseInt(value) <= 0) return "Giá phải là số nguyên dương";
    return true;
  };

  const validateRate = (value) => {
    if (!value) return "Hãy nhập tỉ lệ";
    if (isNaN(value) || parseFloat(value) <= 0) return "Tỉ lệ phải là số dương";
    return true;
  };

  const handleTypeChange = (selectedOption) => {
    setTypeId(selectedOption);
    setValue("typeId", selectedOption, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  function onSubmit(data) {
    const brandId = storageService.getLoginId();
    const formData = new FormData();
    formData.append("brandId", brandId);
    formData.append("typeId", typeId);
    formData.append("voucherName", data.voucherName);
    formData.append("price", parseInt(data.price));
    formData.append("rate", parseFloat(data.rate));
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("state", true);
    if (voucherImage) {
      formData.append("image", voucherImage);
    }

    createVoucherItem(formData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Loại ưu đãi" error={errors?.typeId?.message}>
        <SelectForm
          id="typeId"
          placeholder="Chọn loại ưu đãi"
          disabled={isCreating}
          onChange={handleTypeChange}
          options={[
            { value: "type1", label: "Loại 1" },
            { value: "type2", label: "Loại 2" }
          ]}
        />
      </FormRow>

      <FormRow label="Tên phiếu ưu đãi" error={errors?.voucherName?.message}>
        <input
          type="text"
          id="voucherName"
          disabled={isCreating}
          {...register("voucherName", {
            required: "Hãy nhập tên phiếu ưu đãi",
          })}
        />
      </FormRow>

      <FormRow label="Giá" error={errors?.price?.message}>
        <InputPriceUnit
          type="number"
          id="price"
          disabled={isCreating}
          {...register("price", {
            validate: validatePrice,
          })}
        />
      </FormRow>

      <FormRow label="Tỉ lệ chuyển đổi" error={errors?.rate?.message}>
        <InputPriceUnit
          type="number"
          step="0.1"
          id="rate"
          disabled={isCreating}
          {...register("rate", {
            validate: validateRate,
          })}
        />
      </FormRow>

      <FormRow label="Điều kiện" error={errors?.condition?.message}>
        <Textarea
          id="condition"
          disabled={isCreating}
          {...register("condition", {
            required: "Hãy nhập điều kiện",
          })}
        />
      </FormRow>

      <FormRow label="Mô tả" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isCreating}
          {...register("description", {
            required: "Hãy nhập mô tả",
          })}
        />
      </FormRow>

      <FormRow label="Hình ảnh" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          onChange={handleImageChange}
        />
        {voucherImage && (
          <Button 
            type="button" 
            $variations="secondary" 
            onClick={() => setVoucherImage(null)}
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
        <Button disabled={isCreating}>
          Tạo phiếu ưu đãi mới
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateVoucherItemForm;
