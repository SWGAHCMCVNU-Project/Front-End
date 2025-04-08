import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../ui/Button";
import FileInput from "../../../ui/FileInput";
import Form from "../../../ui/Form";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import ImageCardEditForm from "../../brands/ImageCardEditForm";
import FormRow from "./FormRow";
import { useUpdateBrand } from "../../../hooks/brand/useUpdateBrand";

const BrandFormContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormHalf = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 12.6rem;
`;

function EditBrandForm({ brandToEdit = {}, onCloseModal }) {
  const { isLoading, updateBrand } = useUpdateBrand();

  const { id: editId, openingHours, closingHours, ...editValues } = brandToEdit;

  if (!editId) {
    return <p>Không tìm thấy thương hiệu để chỉnh sửa.</p>;
  }

  const [file, setFile] = useState(null); // Ảnh bìa
  const [fileLogo, setFileLogo] = useState(null); // Logo

  const handleCoverPhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileRemove = () => {
    setFile(null);
    setValue("coverPhoto", null);
  };

  const handleLogoChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileLogo(selectedFile);
  };

  const handleFileLogoRemove = () => {
    setFileLogo(null);
    setValue("logo", null);
  };

  const { register, handleSubmit, getValues, setValue, formState } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;

  // Định dạng giờ mở/đóng cửa từ chuỗi "HH:mm:ss" sang "HH:mm" cho input type="time"
  const formattedOpeningHours = openingHours
    ? openingHours.slice(0, 5)
    : "00:00";
  const formattedClosingHours = closingHours
    ? closingHours.slice(0, 5)
    : "00:00";

  const validateClosingTime = (value) => {
    const openingTime = getValues("openingHours");
    return value > openingTime || "Thời gian đóng cửa phải sau thời gian mở cửa";
  };

  function onSubmit(data) {
    const logo = fileLogo || data.logo;
    const coverPhoto = file || data.coverPhoto;

    // Chuyển đổi thời gian từ HH:mm sang HH:mm:ss (theo dữ liệu mẫu thực tế)
    const formatTime = (time) => (time ? `${time}:00` : "00:00:00");

    const brandData = {
      ...data,
      logo,
      coverPhoto,
      openingHours: formatTime(data.openingHours || formattedOpeningHours),
      closingHours: formatTime(data.closingHours || formattedClosingHours),
    };


    updateBrand(
      { brandData },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <BrandFormContainer>
        <FormHalf>
          <FormRow label="Tên thương hiệu" error={errors?.brandName?.message}>
            <Input
              type="text"
              id="brandName"
              disabled={isLoading}
              {...register("brandName", {
                required: "Hãy nhập tên thương hiệu",
                minLength: {
                  value: 3,
                  message: "Tên thương hiệu ít nhất 3 kí tự",
                },
                maxLength: {
                  value: 50,
                  message: "Tên thương hiệu tối đa 50 kí tự",
                },
              })}
            />
          </FormRow>

          <FormRow label="Tên viết tắt" error={errors?.acronym?.message}>
            <Input
              type="text"
              id="acronym"
              disabled={isLoading}
              {...register("acronym", {
                required: "Hãy nhập tên viết tắt",
              })}
            />
          </FormRow>

          <FormRow label="Địa chỉ" error={errors?.address?.message}>
            <Input
              type="text"
              id="address"
              disabled={isLoading}
              {...register("address", {
                required: "Hãy nhập địa chỉ",
                minLength: {
                  value: 3,
                  message: "Địa chỉ ít nhất 3 kí tự",
                },
                maxLength: {
                  value: 500,
                  message: "Địa chỉ tối đa 500 kí tự",
                },
              })}
            />
          </FormRow>

          <FormRow label="Trạng thái hoạt động" error={errors?.state?.message}>
            <Select
              id="state"
              disabled={isLoading}
              defaultValue={editValues.state ? "true" : "false"}
              onChange={(event) => {
                const selectedOption = event.target.value;
                setValue("state", selectedOption === "true", {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              options={[
                { value: "true", label: "Hoạt động" },
                { value: "false", label: "Không hoạt động" },
              ]}
            />
          </FormRow>

          {/* <ImageCardEditForm
            label="Logo"
            error={errors?.logo?.message}
            file={fileLogo}
            avatar={editValues.logo}
            fileRemove={handleFileLogoRemove}
          >
            <FileInput
              id="logo"
              accept="image/*"
              {...register("logo", {
                required: !editValues.logo && !fileLogo ? "Thêm logo" : false,
              })}
              onChange={handleLogoChange}
            />
          </ImageCardEditForm> */}
        </FormHalf>

        <FormHalf>
          <FormRow label="Mô tả" error={errors?.description?.message}>
            <Textarea
              id="description"
              disabled={isLoading}
              defaultValue={editValues.description || ""}
              {...register("description", {
                required: "Hãy nhập mô tả",
                minLength: {
                  value: 3,
                  message: "Mô tả ít nhất 3 kí tự",
                },
                maxLength: {
                  value: 500,
                  message: "Mô tả tối đa 500 kí tự",
                },
              })}
            />
          </FormRow>

          <FormRow label="Mở cửa" error={errors?.openingHours?.message}>
            <Input
              type="time"
              id="openingHours"
              disabled={isLoading}
              defaultValue={formattedOpeningHours}
              {...register("openingHours", {
                required: "Hãy nhập giờ mở cửa",
              })}
            />
          </FormRow>

          <FormRow label="Đóng cửa" error={errors?.closingHours?.message}>
            <Input
              type="time"
              id="closingHours"
              disabled={isLoading}
              defaultValue={formattedClosingHours}
              {...register("closingHours", {
                required: "Hãy nhập giờ đóng cửa",
                validate: validateClosingTime,
              })}
            />
          </FormRow>

          <ImageCardEditForm
            label="Ảnh bìa"
            error={errors?.coverPhoto?.message}
            file={file}
            avatar={editValues.coverPhoto}
            fileRemove={handleFileRemove}
          >
            <FileInput
              id="coverPhoto"
              accept="image/*"
              {...register("coverPhoto", {
                required:
                  !editValues.coverPhoto && !file ? "Thêm ảnh bìa" : false,
              })}
              onChange={handleCoverPhotoChange}
            />
          </ImageCardEditForm>
        </FormHalf>
      </BrandFormContainer>

      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => onCloseModal?.()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isLoading}>Chỉnh sửa thương hiệu</Button>
      </FormRow>
    </Form>
  );
}

export default EditBrandForm;