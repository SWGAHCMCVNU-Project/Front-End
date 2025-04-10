import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import Textarea from "../../ui/Textarea";
import { CreateUpdateButton } from "../../ui/custom/Button/Button";
import { CustomFormRow } from "../../ui/custom/Form/InputItem/CustomFormItem";
import {
  SelectForm,
  SelectFormState,
} from "../../ui/custom/Select/SelectBox/SelectForm";
import { ReviewImageUpload } from "../../ui/custom/Upload/UploadImage";
import { useAreas } from "../../hooks/areas/useAreas";
import { useUpdateStore } from "../../hooks/store/useUpdateStore";
import toast from "react-hot-toast";
import Button from "../../ui/Button";

const StyledDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem 4rem;
  overflow: hidden;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding-bottom: 2px;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

const Header = styled.header`
  color: var(--color-green-600);
  font-size: 1.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.7rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const CampusFormContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const LeftFormHalf = styled.div`
  flex: 3;
`;

const RightFormHalf = styled.div`
  flex: 2;
`;

const TimeFrameContainer = styled.div`
  display: flex;
  gap: 3rem;
  padding-top: 12px;
`;

const TimeFrameHalf = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  margin: 5px 1px 30px;
`;

function StoreFormUpdate() {
  const moveBack = useMoveBack();
  const { isEditing, isLoading, editStore } = useUpdateStore();
  const location = useLocation();
  const [storeToEdit, setStoreToEdit] = useState(location.state?.store);
  const isWorking = isEditing || isLoading;

  if (!storeToEdit) {
    return (
      <div>
        Không tìm thấy dữ liệu cửa hàng để chỉnh sửa. Vui lòng quay lại trang
        chi tiết cửa hàng.
      </div>
    );
  }

  const { areas, isLoading: isLoadingAreas } = useAreas({ state: true });
  const [areaOptions, setAreaOptions] = useState([]);
  const [areaValid, setAreaValid] = useState(null);
  const [fileCard, setFileCard] = useState(null);

  const {
    id: editId,
    openingHours,
    closingHours,
    ...editValues
  } = useMemo(() => storeToEdit, [storeToEdit]);

  const stableAreas = useMemo(() => areas, [areas?.result]);

  const getDataSelectBox = () => {
    if (stableAreas?.result && Array.isArray(stableAreas.result)) {
      const filteredAreas = stableAreas.result.filter((c) => c.state);
      if (filteredAreas.length > 0) {
        const newOptions = filteredAreas.map((c) => ({
          value: c.id,
          label: c.areaName,
        }));
        setAreaOptions((prevOptions) => {
          if (JSON.stringify(prevOptions) !== JSON.stringify(newOptions)) {
            return newOptions;
          }
          return prevOptions;
        });
        const check = filteredAreas.find(
          (area) => area.id === editValues.areaId
        );
        if (check) {
          setAreaValid((prevValid) =>
            prevValid !== check.id ? check.id : prevValid
          );
        }
      }
    }
  };

  useEffect(() => {
    getDataSelectBox();
  }, [stableAreas]);

  const { register, handleSubmit, reset, getValues, setValue, formState } =
    useForm({
      defaultValues: editValues,
    });
  const { errors, isSubmitting } = formState;

  const handleAreaOptions = (selectedOption) => {
    setValue("areaId", selectedOption, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileCard(selectedFile);
  };

  const handleAvatarRemove = () => {
    setFileCard(null);
    setValue("avatar", editValues?.avatar);
  };

  if (isLoading) return <Spinner />;

  const validateClosingTime = (value) => {
    const openingTime = getValues("openingHours");
    return (
      value > openingTime || "Thời gian đóng cửa phải sau thời gian mở cửa"
    );
  };

  const formattedOpeningHours = openingHours ? openingHours.slice(0, 5) : "";
  const formattedClosingHours = closingHours ? closingHours.slice(0, 5) : "";

  function onSubmit(data) {
    return new Promise((resolve, reject) => {
      const avatar =
        typeof data.avatar === "string" ? data.avatar : data.avatar[0];
      editStore(
        { id: editId, storeData: { ...data, avatar } },
        {
          onSuccess: (data) => {
            setStoreToEdit(data);
            toast.success("Cập nhật cửa hàng thành công!");
            moveBack();
            resolve();
          },
          onError: (err) => {
            toast.error("Cập nhật cửa hàng thất bại: " + err.message);
            reject(err);
          },
        }
      );
    });
  }

  function onError(errors) {
  }

  const selectValue = useMemo(
    () =>
      editValues.areaId === areaValid
        ? editValues.areaId
        : "Khu vực không hợp lệ, vui lòng cập nhật",
    [editValues.areaId, areaValid]
  );

  return (
    <div>
      <ButtonGroup>
        <ButtonText onClick={moveBack}>← Quay lại</ButtonText>
      </ButtonGroup>

      <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
        <CampusFormContainer>
          <LeftFormHalf>
            <StyledDataBox>
              <Header>
                <div>Thông tin cơ bản</div>
              </Header>

              <CustomFormRow
                label="Tên Cửa Hàng"
                error={errors?.storeName?.message}
              >
                <Input
                  type="text"
                  id="storeName"
                  disabled={isEditing}
                  placeholder="Nhập tên cửa hàng"
                  {...register("storeName", {
                    required: "Vui lòng nhập tên cửa hàng",
                    validate: {
                      noWhiteSpace: (value) =>
                        value.trim().length >= 3 ||
                        "Tên cửa hàng phải chứa ít nhất 3 kí tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Tên cửa hàng tối đa 50 kí tự",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Mô tả" error={errors?.description?.message}>
                <Textarea
                  type="text"
                  id="description"
                  disabled={isEditing}
                  placeholder="Nhập mô tả..."
                  {...register("description", {
                    required: "Vui lòng nhập mô tả",
                    validate: {
                      noWhiteSpace: (value) =>
                        value.trim().length >= 3 || "Mô tả ít nhất 3 kí tự",
                    },
                    maxLength: {
                      value: 500,
                      message: "Mô tả tối đa 500 kí tự",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Địa chỉ" error={errors?.address?.message}>
                <Input
                  type="text"
                  id="address"
                  disabled={isEditing}
                  placeholder="Số nhà, đường, thôn/xóm/ấp, tổ/khu phố"
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ",
                    validate: {
                      notEmpty: (value) =>
                        value.trim().length > 0 ||
                        "Địa chỉ không được để trống",
                      minLength: (value) =>
                        value.trim().length >= 3 ||
                        "Địa chỉ phải có ít nhất 3 ký tự",
                    },
                    maxLength: {
                      value: 100,
                      message: "Địa chỉ tối đa 100 ký tự",
                    },
                  })}
                />
              </CustomFormRow>
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Khu vực</div>
              </Header>
              {areaOptions.length > 0 ? (
                <CustomFormRow error={errors?.areaId?.message}>
                  <SelectForm
                    id="areaId"
                    value={selectValue}
                    {...register("areaId", {
                      required: "Vui lòng chọn khu vực",
                    })}
                    disabled={isEditing || isLoadingAreas}
                    onChange={handleAreaOptions}
                    options={areaOptions}
                  />
                </CustomFormRow>
              ) : (
                <SpinnerMini />
              )}
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Thời gian làm việc</div>
              </Header>
              <TimeFrameContainer>
                <TimeFrameHalf>
                  <CustomFormRow
                    label="Mở cửa"
                    error={errors?.openingHours?.message}
                  >
                    <Input
                      type="time"
                      id="openingHours"
                      defaultValue={formattedOpeningHours}
                      disabled={isEditing}
                      {...register("openingHours", {
                        required: "Vui lòng thêm giờ",
                      })}
                    />
                  </CustomFormRow>
                </TimeFrameHalf>

                <TimeFrameHalf>
                  <CustomFormRow
                    label="Đóng cửa"
                    error={errors?.closingHours?.message}
                  >
                    <Input
                      type="time"
                      id="closingHours"
                      defaultValue={formattedClosingHours}
                      disabled={isEditing}
                      {...register("closingHours", {
                        required: "Vui lòng thêm giờ",
                        validate: {
                          afterOpening: (value, formValues) => {
                            const openingTime = formValues.openingHours;
                            return (
                              (openingTime && value > openingTime) ||
                              "Giờ đóng cửa phải sau giờ mở cửa"
                            );
                          },
                        },
                      })}
                    />
                  </CustomFormRow>
                </TimeFrameHalf>
              </TimeFrameContainer>
            </StyledDataBox>
          </LeftFormHalf>

          <RightFormHalf>
            <StyledDataBox>
              <Header>
                <div>Hình ảnh</div>
              </Header>
              <ReviewImageUpload
                label="Ảnh cửa hàng"
                error={errors?.avatar?.message}
                file={fileCard}
                fileRemove={handleAvatarRemove}
                disabled={isEditing}
                image={editValues?.avatar}
                edit={true}
              >
                <FileInput
                  id="avatar"
                  accept="image/*"
                  label="Chọn ảnh"
                  disabled={isEditing}
                  {...register("avatar", {
                    required:
                      !getValues("avatar") || getValues("avatar").length === 0
                        ? "Vui lòng thêm hình ảnh cho cửa hàng"
                        : false,
                  })}
                  onChange={handleAvatarChange}
                />
              </ReviewImageUpload>
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Trạng thái hoạt động</div>
              </Header>
              <CustomFormRow>
                <SelectFormState
                  id="state"
                  disabled={isEditing}
                  value={
                    editValues?.state === true ? "Hoạt động" : "Không hoạt động"
                  }
                  {...register("state", {
                    required: "Vui lòng chọn trạng thái",
                  })}
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
              </CustomFormRow>
            </StyledDataBox>
          </RightFormHalf>
        </CampusFormContainer>

        <ButtonGroup>
          <Button disabled={isWorking || isSubmitting}>
            {isWorking || isSubmitting ? <SpinnerMini /> : "Cập nhật cửa hàng"}
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}

export default StoreFormUpdate;
