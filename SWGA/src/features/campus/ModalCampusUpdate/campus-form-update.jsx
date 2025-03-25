// components/CampusFormUpdate.js
import { PlusOutlined } from "@ant-design/icons";
import { Select, Upload } from "antd";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Textarea from "../../../ui/Textarea";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import { SelectFormState } from "../../../ui/custom/Select/SelectBox/SelectForm";
import { useCreateCampus } from "../../../hooks/campus/useCreateCampus";
import useUpdateCampus from "../../../hooks/campus/useUpdateCampus";
import { useAreas } from "../../../hooks/areas/useAreas";

function CampusFormUpdate({ campusToEdit = {}, onCloseModal }) {
  const { isCreating, createCampus } = useCreateCampus();
  const { isEditing, editCampus } = useUpdateCampus();
  const { isLoading: isLoadingAreas, areas } = useAreas();
  const [image, setImage] = useState(null);

  const isWorking = isCreating || isEditing;

  const { id: editId, link, ...editValues } = campusToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
          campusName: editValues.campusName,
          areaId: editValues.areaId?.toString(), // Chuyển sang string
        }
      : {},
  });

  const handlePhoneInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  const handleChangeImage = (e) => {
    const file = e && e.fileList[0];
    if (file) {
      setImage(e.file);
    } else {
      setImage(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  function onSubmit(data) {
    const formData = {
      ...data,
      areaId: data.areaId, // Đúng tên trường
      image: image,
    };

    if (isEditSession) {
      editCampus(
        { id: editId, formData },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
          onError: (error) => console.error("Sửa thất bại:", error),
        }
      );
    } else {
      createCampus(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
        onError: (error) => console.error("Tạo thất bại:", error),
      });
    }
  }

  function onError(errors) {
    console.log("Lỗi validation form:", errors);
  }

  const areaOptions =
    areas?.result?.map((area) => ({
      value: area.id.toString(), // Đảm bảo value là string

      label: area.areaName,
    })) || [];

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={handleKeyDown}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Khu vực" error={errors?.areaId?.message}>
        <Controller
          control={control}
          name="areaId"
          rules={{ required: "Vui lòng chọn khu vực" }}
          render={({ field }) => (
            <Select
              id="areaId"
              disabled={isWorking || isLoadingAreas}
              options={areaOptions}
              style={{ width: "100%" }}
              value={field.value}
              onChange={(value) => {
                console.log("Selected areaId:", value); // Log giá trị khi chọn
                field.onChange(value);
              }}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            />
          )}
        />
      </FormRow>
      <FormRow label="Tên campus" error={errors?.campusName?.message}>
        <Input
          type="text"
          id="campusName"
          placeholder="Nhập tên campus..."
          disabled={isWorking}
          {...register("campusName", {
            required: "Vui lòng nhập tên campus",
            validate: {
              noWhiteSpace: (value) =>
                value.trim().length >= 3 ||
                "Tên campus phải chứa ít nhất 3 kí tự",
            },
            maxLength: { value: 50, message: "Tên campus tối đa 50 kí tự" },
          })}
        />
      </FormRow>

      <FormRow label="Địa chỉ" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          placeholder="Nhập địa chỉ..."
          disabled={isWorking}
          {...register("address", {
            validate: {
              noWhiteSpace: (value) =>
                !value ||
                value.trim().length >= 3 ||
                "Địa chỉ phải chứa ít nhất 3 kí tự",
            },
            maxLength: { value: 100, message: "Địa chỉ tối đa 100 kí tự" },
          })}
        />
      </FormRow>

      <FormRow label="Số điện thoại" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          disabled={isWorking}
          placeholder="Ví dụ: 0909339779"
          {...register("phone", {
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Số điện thoại hợp lệ phải từ 10 đến 11 số",
            },
          })}
          onInput={handlePhoneInput}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          placeholder="Nhập địa chỉ email..."
          {...register("email", {
            pattern: {
              value: /^(?!\.)[a-zA-Z0-9]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
              message: "Định dạng email không hợp lệ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Link Website (nếu có)">
        <Input
          type="text"
          id="link"
          defaultValue={link !== "null" && link}
          disabled={isWorking}
          placeholder="Nhập link website..."
          {...register("link")}
        />
      </FormRow>

      {isEditSession ? (
        <FormRow label="Ảnh campus">
          <Upload
            accept="image/*"
            id="image"
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleChangeImage}
            showUploadList={false}
            disabled={isWorking}
          >
            {image && image.name ? (
              <img
                src={URL.createObjectURL(new Blob([image]))}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <img src={campusToEdit?.image} alt="avatar" />
            )}
          </Upload>
        </FormRow>
      ) : (
        <FormRow label="Ảnh campus" error={errors?.image?.message}>
          <Upload
            accept="image/*"
            id="image"
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleChangeImage}
            showUploadList={false}
            disabled={isWorking}
          >
            {image && image.name ? (
              <img
                src={URL.createObjectURL(new Blob([image]))}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
        </FormRow>
      )}

      <FormRow label="Mô tả" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          placeholder="Nhập mô tả..."
          disabled={isWorking}
          {...register("description", {
            validate: {
              noWhiteSpace: (value) =>
                !value || value.trim().length >= 3 || "Mô tả ít nhất 3 kí tự",
            },
            maxLength: { value: 500, message: "Mô tả tối đa 500 kí tự" },
          })}
        />
      </FormRow>

      {isEditSession ? (
        <FormRow label="Trạng thái hoạt động" error={errors?.state?.message}>
          <SelectFormState
            id="state"
            disabled={isEditing}
            value={editValues?.state === true ? "Hoạt động" : "Không hoạt động"}
            {...register("state")}
            options={[
              editValues?.state === true
                ? { value: "false", label: "Không hoạt động" }
                : { value: "true", label: "Hoạt động" },
            ]}
            onChange={(selectedOption) => {
              setValue("state", selectedOption, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />
        </FormRow>
      ) : null}

      <FormRow>
        <ButtonCustom
          $variations="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Hủy bỏ
        </ButtonCustom>
        <ButtonCustom type="submit" disabled={isWorking}>
          {isEditSession ? "Lưu thay đổi" : "Tạo campus"}
        </ButtonCustom>
      </FormRow>
    </Form>
  );
}

export default CampusFormUpdate;
