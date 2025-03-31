import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../ui/Button";
import FileInput from "../../../ui/FileInput";
import Form from "../../../ui/Form";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import ImageCardEditForm from "../../brands/ImageCardEditForm";
import FormRow from "./FormRow";
import useUpdateCampus from "../../../hooks/campus/useUpdateCampus";
import { useAreas } from "../../../hooks/areas/useAreas";

// Enhanced styles for the phone input to prevent gaps and autofill issues
const PhoneInputWrapper = styled.div`
  & input {
    width: 100%;
    box-sizing: border-box; /* Ensure padding and border are included in width */
  }

  & input:focus {
    outline: none;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-grey-300);
  }

  /* Prevent browser autofill from causing spacing issues */
  & input:-webkit-autofill,
  & input:-webkit-autofill:hover,
  & input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px var(--color-grey-0) inset !important;
    box-shadow: 0 0 0 1000px var(--color-grey-0) inset !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const CampusFormContainer = styled.div`
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

function EditCampusForm({ campusToEdit = {}, onCloseModal }) {
  const { isEditing, editCampus } = useUpdateCampus();

  const { id: editId, ...editValues } = campusToEdit;

  if (!editId) {
    return <p>Không tìm thấy campus để chỉnh sửa.</p>;
  }

  // Fetch the list of areas using useAreas
  const { isLoading: isLoadingAreas, areas, error: areasError } = useAreas({
    page: 1,
    size: 100,
    searchName: "",
    isAsc: true,
  });

  const [fileImage, setFileImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileImage(selectedFile);
  };

  const handleImageRemove = () => {
    setFileImage(null);
    setValue("image", null);
  };

  const { register, handleSubmit, setValue, formState, control } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;

  // Transform areas.result into the format expected by the Select component
  const areaOptions = areas?.result?.map((area) => ({
    value: area.id,
    label: area.areaName,
  })) || [];

  // Debug: Log the defaultValues and areaOptions
  console.log("EditCampusForm - defaultValues:", editValues);
  console.log("EditCampusForm - areaOptions:", areaOptions);

  function onSubmit(data) {
    const image = fileImage || data.image;

    const campusData = {
      ...data,
      image,
    };

    editCampus(
      { id: editId, formData: campusData },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <CampusFormContainer>
        <FormHalf>
          <FormRow label="Tên trường học" error={errors?.campusName?.message}>
            <Input
              type="text"
              id="campusName"
              disabled={isEditing}
              {...register("campusName", {
                required: "Hãy nhập tên trường học",
                minLength: { value: 3, message: "Tên ít nhất 3 kí tự" },
                maxLength: { value: 50, message: "Tên tối đa 50 kí tự" },
              })}
            />
          </FormRow>

          <FormRow label="Địa chỉ" error={errors?.address?.message}>
            <Input
              type="text"
              id="address"
              disabled={isEditing}
              {...register("address", {
                required: "Hãy nhập địa chỉ",
                minLength: { value: 3, message: "Địa chỉ ít nhất 3 kí tự" },
                maxLength: { value: 500, message: "Địa chỉ tối đa 500 kí tự" },
              })}
            />
          </FormRow>

          <FormRow label="Khu vực" error={errors?.areaId?.message}>
            {isLoadingAreas ? (
              <Input type="text" value="Đang tải..." disabled />
            ) : areasError ? (
              <Input type="text" value="Lỗi tải khu vực" disabled />
            ) : (
              <Controller
                name="areaId"
                control={control}
                rules={{ required: "Hãy chọn khu vực" }}
                render={({ field }) => (
                  <Select
                    options={[
                      { value: "", label: "Chọn khu vực..." },
                      ...areaOptions,
                    ]}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isEditing}
                  />
                )}
              />
            )}
          </FormRow>

          <FormRow label="Số lượng sinh viên" error={errors?.numberOfStudents?.message}>
            <Input
              type="number"
              id="numberOfStudents"
              disabled={isEditing}
              {...register("numberOfStudents", {
                min: { value: 0, message: "Số lượng không thể âm" },
              })}
            />
          </FormRow>
        </FormHalf>

        <FormHalf>
          <FormRow label="Mô tả" error={errors?.description?.message}>
            <Textarea
              id="description"
              disabled={isEditing}
              defaultValue={editValues.description || ""}
              {...register("description", {
                required: "Hãy nhập mô tả",
                minLength: { value: 3, message: "Mô tả ít nhất 3 kí tự" },
                maxLength: { value: 500, message: "Mô tả tối đa 500 kí tự" },
              })}
            />
          </FormRow>

         

          <FormRow label="Liên kết" error={errors?.link?.message}>
            <Input
              type="text"
              id="link"
              disabled={isEditing}
              {...register("link")}
            />
          </FormRow>

          <ImageCardEditForm
            label="Ảnh"
            error={errors?.image?.message}
            file={fileImage}
            avatar={editValues.image}
            fileRemove={handleImageRemove}
          >
            <FileInput
              id="image"
              accept="image/*"
              {...register("image", {
                required: !editValues.image && !fileImage ? "Thêm ảnh" : false,
              })}
              onChange={handleImageChange}
            />
          </ImageCardEditForm>
        </FormHalf>
      </CampusFormContainer>

      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isEditing}
          onClick={() => onCloseModal?.()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isEditing}>Chỉnh sửa trường học</Button>
      </FormRow>
    </Form>
  );
}

export default EditCampusForm;