import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import { SelectForm } from "../../ui/custom/Select/SelectBox/SelectForm";
import { useCreateVoucher } from "../../hooks/voucher/useCreateVoucher";
import { useVoucherTypes } from "../../hooks/voucher-type/useVoucherTypes";
import { useBrand } from "../../hooks/brand/useBrand";
import FileInput from "../../ui/FileInput";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import React from "react";

const InputPriceUnit = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const CreateVoucherForm = ({ onCloseModal }) => {
  const { isCreating, createVoucher } = useCreateVoucher();
  const { voucherTypes } = useVoucherTypes();
  const { brand, } = useBrand();
  const queryClient = useQueryClient();
  const [voucherImage, setVoucherImage] = useState(null);

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: { state: true, status: true },
  });
  const { errors } = formState;

  const handleImageChange = (e) => setVoucherImage(e.target.files[0]);

  const validatePrice = (value) => (!value ? "Hãy nhập giá" : (parseInt(value) <= 0 || isNaN(parseInt(value)) ? "Giá phải là số nguyên dương" : true));
  const validateRate = (value) => (!value ? "Hãy nhập tỉ lệ" : (parseFloat(value) <= 0 || isNaN(parseFloat(value)) ? "Tỉ lệ phải là số dương" : true));

  const onSubmit = (data) => {
    console.log("Brand data:", brand);
    
    // Lấy brandId từ brand
    const brandId = brand?.id;
    
    console.log("Using brandId for creating voucher:", brandId);
    
    if (!brandId) {
      toast.error("Không tìm thấy thông tin thương hiệu");
      return;
    }

    if (!data.typeId) {
      toast.error("Vui lòng chọn loại ưu đãi");
      return;
    }

    const formData = {
      brandId: brandId,
      typeId: data.typeId,
      voucherName: data.voucherName?.trim() || "",
      price: parseInt(data.price, 10),
      rate: Number(data.rate),
      condition: data.condition?.trim() || "",
      description: data.description?.trim() || "",
      state: true,
      status: true,
    };

    // Log dữ liệu trước khi gửi
    console.log("Form data to be submitted:", formData);
    console.log("BrandId being used:", brandId);

    if (!formData.voucherName) {
      toast.error("Vui lòng nhập tên phiếu ưu đãi");
      return;
    }
    if (!formData.condition) {
      toast.error("Vui lòng nhập điều kiện");
      return;
    }
    if (!formData.description) {
      toast.error("Vui lòng nhập mô tả");
      return;
    }

    if (voucherImage) {
      formData.image = voucherImage;
      console.log("Image to be uploaded:", voucherImage);
    }

    createVoucher(formData, {
      onSuccess: (response) => {
        console.log("Create voucher response:", response);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Tạo phiếu ưu đãi thành công!");
          reset();
          onCloseModal?.();
          queryClient.invalidateQueries(["vouchers"]);
        } else {
          toast.error(response.data?.message || "Có lỗi xảy ra khi tạo phiếu ưu đãi");
        }
      },
      onError: (error) => {
        console.error("Error creating voucher:", error);
        toast.error(
          error.message || "Tạo phiếu ưu đãi thất bại. Vui lòng thử lại!"
        );
      },
    });
  };

  const typeOptions = React.useMemo(() => {
    if (!voucherTypes) return [];
    return voucherTypes.map((type) => ({
      value: type.id,
      label: type.typeName
    }));
  }, [voucherTypes]);

  // if (isLoadingBrand) {
  //   return <div style={{ padding: "2rem", textAlign: "center" }}>Đang tải thông tin thương hiệu...</div>;
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Loại ưu đãi" error={errors?.typeId?.message}>
        <Controller
          name="typeId"
          control={control}
          rules={{ required: "Hãy chọn loại ưu đãi" }}
          render={({ field }) => (
            <SelectForm
              {...field}
              id="typeId"
              placeholder="Chọn loại ưu đãi"
              disabled={isCreating}
              options={typeOptions}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </FormRow>

      <FormRow label="Tên phiếu ưu đãi" error={errors?.voucherName?.message}>
        <input type="text" id="voucherName" disabled={isCreating} {...register("voucherName", { required: "Hãy nhập tên phiếu ưu đãi" })} />
      </FormRow>

      <FormRow label="Giá" error={errors?.price?.message}>
        <InputPriceUnit type="number" id="price" disabled={isCreating} {...register("price", { validate: validatePrice })} />
      </FormRow>

      <FormRow label="Tỉ lệ chuyển đổi" error={errors?.rate?.message}>
        <InputPriceUnit type="number" step="0.1" id="rate" disabled={isCreating} {...register("rate", { validate: validateRate })} />
      </FormRow>

      <FormRow label="Điều kiện" error={errors?.condition?.message}>
        <Textarea id="condition" disabled={isCreating} {...register("condition", { required: "Hãy nhập điều kiện" })} />
      </FormRow>

      <FormRow label="Mô tả" error={errors?.description?.message}>
        <Textarea id="description" disabled={isCreating} {...register("description", { required: "Hãy nhập mô tả" })} />
      </FormRow>

      <FormRow label="Hình ảnh" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" disabled={isCreating} onChange={handleImageChange} />
        {voucherImage && <Button type="button" $variations="secondary" onClick={() => setVoucherImage(null)}>Xóa ảnh</Button>}
      </FormRow>

      <FormRow>
        <Button $variations="secondary" type="reset" disabled={isCreating} onClick={() => onCloseModal?.()}>Hủy bỏ</Button>
        <Button disabled={isCreating}>Tạo phiếu ưu đãi mới</Button>
      </FormRow>
    </Form>
  );
};

CreateVoucherForm.propTypes = { onCloseModal: PropTypes.func };
export default CreateVoucherForm;