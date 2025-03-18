import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import { CustomFormRow } from "../../ui/custom/Form/InputItem/CustomFormItem";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import ImageCardEditForm from "./ImageCardEditForm";
import { useCreateArea } from "../../hooks/areas/useCreateArea";
import { useEditArea } from "../../hooks/areas/useEditArea";

function CreateAreaForm({ areaToEdit = {}, onCloseModal }) {
  const { isCreating, createArea } = useCreateArea();
  const { isEditing, editArea } = useEditArea();

  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = areaToEdit;
  const isEditSession = Boolean(editId);

  const [fileImageArea, setFileImageArea] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileImageArea(selectedFile);
  };

  const handleFileImageRemove = () => {
    setFileImageArea(null);
    setValue("image", null);
  };

  const { register, handleSubmit, reset, getValues, setValue, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  function onSubmit(data) {
    // Chuyển đổi state từ chuỗi sang boolean
    const processedData = {
      ...data,
      state: data.state === "true", // Chuyển "true" thành true, "false" thành false
    };
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editArea(
        { newAreaData: { ...processedData, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createArea(
        { ...processedData, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
      style={{
       
     
        width: "600px",
        margin: "20px auto",
        
      }}
    >
      <CustomFormRow label="Tên khu vực" error={errors?.areaName?.message}>
        <Input
          type="text"
          id="areaName"
          disabled={isWorking}
          {...register("areaName", {
            required: "Hãy nhập tên khu vực",
            maxLength: {
              value: 50,
              message: "Tên khu vực tối đa 50 kí tự",
            },
            validate: {
              noWhiteSpace: (value) =>
                value.trim().length >= 3 || "Tên khu vực ít nhất 3 kí tự",
            },
          })}
        />
      </CustomFormRow>

      <CustomFormRow label="Mô tả cho khu vực" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "Hãy nhập mô tả",
            maxLength: {
              value: 200,
              message: "Mô tả tối đa 200 kí tự",
            },
            validate: {
              noWhiteSpace: (value) =>
                value.trim().length >= 3 || "Mô tả ít nhất 3 kí tự",
            },
          })}
        />
      </CustomFormRow>

      {isEditSession ? (
        <CustomFormRow label="Trạng thái hoạt động" error={errors?.state?.message}>
          <Select
            id="state"
            disabled={isWorking}
            value={getValues("state")}
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
        </CustomFormRow>
      ) : null}

      {isEditSession ? (
        <ImageCardEditForm
          label="Ảnh khu vực"
          error={errors?.image?.message}
          file={fileImageArea}
          avatar={editValues.image}
          fileRemove={handleFileImageRemove}
        >
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required:
                !getValues("image") || getValues("image").length === 0
                  ? "Thêm hình ảnh khu vực"
                  : false,
            })}
            onChange={handleImageChange}
          />
        </ImageCardEditForm>
      ) : (
        <ImageCardEditForm
          label="Ảnh khu vực"
          error={errors?.image?.message}
          file={fileImageArea}
          avatar={editValues.image}
          fileRemove={handleFileImageRemove}
        >
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required:
                !getValues("image") || getValues("image").length === 0
                  ? "Thêm hình ảnh khu vực"
                  : false,
            })}
            onChange={handleImageChange}
          />
        </ImageCardEditForm>
      )}

      <CustomFormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Chỉnh sửa khu vực" : "Tạo khu vực mới"}
        </Button>
      </CustomFormRow>
    </Form>
  );
}

export default CreateAreaForm;