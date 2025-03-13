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
  gap: 3rem;
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

function CreateBrandForm({ brandToEdit = {}, onCloseModal }) {
  const { isEditing, updateBrand } = useUpdateBrand();

  const isWorking = isEditing;
  const { id: editId, openingHours, closingHours, ...editValues } = brandToEdit;

  const isEditSession = Boolean(editId);

  const [file, setFile] = useState(null);
  const [fileLogo, setFileLogo] = useState(null);

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

  const { register, handleSubmit, reset, getValues, setValue, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const formattedOpeningHours = openingHours ? openingHours.slice(0, 5) : "";
  const formattedClosingHours = closingHours ? closingHours.slice(0, 5) : "";

  const validateClosingTime = (value) => {
    const openingTime = getValues("openingHours");
    return (
      value > openingTime || "Thời gian đóng cửa phải sau thời gian mở cửa"
    );
  };

  function onSubmit(data) {
    const logo = typeof data.logo === "string" ? data.logo : data.logo[0];
    const coverPhoto =
      typeof data.coverPhoto === "string"
        ? data.coverPhoto
        : data.coverPhoto[0];

    if (isEditSession)
      updateBrand(
        { newBrandData: { ...data, logo, coverPhoto }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createBrand(
        { ...data, logo: logo, coverPhoto: coverPhoto },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(errors) {
    // console.log(errors);
  }

  const handlePhoneInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

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
              disabled={isWorking}
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
              disabled={isWorking}
              {...register("acronym", {
                required: "Hãy nhập tên viết tắt",
              })}
            />
          </FormRow>

          {!isEditSession ? (
            <FormRow label="Tên đăng nhập" error={errors?.userName?.message}>
              <Input
                type="text"
                id="userName"
                disabled={isWorking}
                {...register("userName", {
                  required: "Hãy nhập tên đăng nhập",
                  minLength: {
                    value: 5,
                    message: "Tên đăng nhập phải có ít nhất 5 kí tự",
                  },
                  maxLength: {
                    value: 50,
                    message: "Tên đăng nhập tối đa 50 kí tự",
                  },
                })}
              />
            </FormRow>
          ) : null}

          {!isEditSession ? (
            <FormRow label="Mật khẩu" error={errors?.password?.message}>
              <Input
                type="text"
                id="password"
                disabled={isWorking}
                {...register("password", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 kí tự",
                  },
                  maxLength: {
                    value: 50,
                    message: "Mật khẩu tối đa 50 kí tự",
                  },
                })}
              />
            </FormRow>
          ) : null}

          <FormRow label="Địa chỉ" error={errors?.address?.message}>
            <Input
              type="text"
              id="address"
              disabled={isWorking}
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

          {isEditSession ? (
            <FormRow
              label="Trạng thái hoạt động"
              error={errors?.state?.message}
            >
              <Select
                id="state"
                disabled={isWorking}
                defaultValue={editValues.state}
                onChange={(event) => {
                  const selectedOption = event.target.value;
                  setValue("state", selectedOption, {
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
          ) : null}

          {isEditSession ? (
            <ImageCardEditForm
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
                  required:
                    !getValues("logo") || getValues("logo").length === 0
                      ? "Thêm ảnh bìa thương hiệu"
                      : false,
                })}
                onChange={handleLogoChange}
              />
            </ImageCardEditForm>
          ) : null}
        </FormHalf>
        <FormHalf>
          {!isEditSession ? (
            <FormRow label="Số điện thoại" error={errors?.phone?.message}>
              <Input
                type="tel"
                id="phone"
                disabled={isWorking}
                {...register("phone", {
                  required: "Hãy nhập số điện thoại",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Vui lòng nhập số điện thoại hợp lệ",
                  },
                })}
                onInput={handlePhoneInput}
              />
            </FormRow>
          ) : null}

          {!isEditSession ? (
            <FormRow label="Email" error={errors?.email?.message}>
              <Input
                type="email"
                id="email"
                disabled={isWorking}
                {...register("email", {
                  required: "Hãy nhập email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ",
                  },
                })}
              />
            </FormRow>
          ) : null}

          <FormRow label="Mô tả" error={errors?.description?.message}>
            <Textarea
              type="number"
              id="description"
              disabled={isWorking}
              defaultValue=""
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
              disabled={isWorking}
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
              disabled={isWorking}
              defaultValue={formattedClosingHours}
              {...register("closingHours", {
                required: "Hãy nhập giờ đóng cửa",
                validate: validateClosingTime,
              })}
            />
          </FormRow>

          {isEditSession ? (
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
                    !getValues("coverPhoto") ||
                    getValues("coverPhoto").length === 0
                      ? "Thêm ảnh bìa thương hiệu"
                      : false,
                })}
                onChange={handleCoverPhotoChange}
              />
            </ImageCardEditForm>
          ) : null}
        </FormHalf>
      </BrandFormContainer>

      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Chỉnh sửa thương hiệu" : "Tạo thương hiệu mới"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBrandForm;
