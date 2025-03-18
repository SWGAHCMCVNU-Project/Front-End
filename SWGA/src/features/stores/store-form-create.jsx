/* eslint-disable no-undef */
// store/components/StoreFormCreate.js (giả định đường dẫn)
import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import storageService from "../../services/storageService";
import ButtonText from "../../ui/ButtonText";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { CreateUpdateButton } from "../../ui/custom/Button/Button";
import { CustomFormRow } from "../../ui/custom/Form/InputItem/CustomFormItem";
import { FormSelect } from "../../ui/custom/Select/SelectBox/SelectForm";
import { ReviewImageUpload } from "../../ui/custom/Upload/UploadImage";
import { useAreas } from "../../hooks/areas/useAreas";
import useCreateStore from "../../hooks/store/useCreateStore";

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

const StaffFormContainer = styled.div`
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

function StoreFormCreate() {
  const { isCreating, createStore, error } = useCreateStore();
  const brandId = storageService.getBrandId(); // Sử dụng getBrandId thay vì getLoginId
  console.log("brandId from StorageService:", brandId);


  const { areas, isLoading: isLoadingAreas } = useAreas({ state: true });
  const [areaOptions, setAreaOptions] = useState([]);
  const [areaError, setAreaError] = useState("");
  const [fileCard, setFileCard] = useState(null);
  const moveBack = useMoveBack();

  // Sử dụng useMemo để ổn định areaOptions dựa trên areas.result
  const computedAreaOptions = useMemo(() => {
    if (areas?.result && Array.isArray(areas.result)) {
      const filteredAreas = areas.result.filter((c) => c.state);
      if (filteredAreas.length > 0) {
        return filteredAreas.map((c) => ({ value: c.id, label: c.areaName }));
      }
    }
    return [];
  }, [areas?.result]);

  useEffect(() => {
    setAreaOptions(computedAreaOptions);
  }, [computedAreaOptions]);

  const { register, handleSubmit, reset, getValues, setValue, formState } = useForm({
    // defaultValues: {
    //   openingHours: "08:00", // Giá trị mặc định để tránh lỗi
    //   closingHours: "17:00",
    // },
  });
  const { errors } = formState;

  const handleAreaOptions = (value) => {
    setValue("areaId", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setAreaError("");
  };

  const handlePhoneInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  const handleAvatarRemove = () => {
    setFileCard(null);
    setValue("avatar", null);
  };

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileCard(selectedFile);
  };

  // Hàm xác thực thời gian đóng cửa
  const validateClosingTime = (value) => {
    const openingTime = getValues("openingHours");
    if (!openingTime || !value) return "Vui lòng nhập thời gian hợp lệ";
    return value > openingTime || "Thời gian đóng cửa phải sau thời gian mở cửa";
  };

  function onSubmit(data) {
    const avatar = typeof data.avatar === "string" ? data.avatar : data.avatar[0];
    if (!data.areaId) {
      setAreaError("Vui lòng chọn khu vực");
      return;
    } else {
      setAreaError("");
    }

    // Log dữ liệu trước khi gửi để debug
    console.log("Form Data before submission:", { ...data, brandId, avatar });

    createStore({ ...data, brandId, avatar });
  }

  function onError(errors) {
    console.log("Form Errors:", errors);
  }

  return (
    <>
      <div className="btn-header">
        <div>
          <ButtonText onClick={moveBack}>← Quay lại</ButtonText>
        </div>
      </div>

      <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
        <StaffFormContainer>
          <LeftFormHalf>
            <StyledDataBox>
              <Header>
                <div>Thông tin đăng nhập</div>
              </Header>
              <CustomFormRow label="Tên tài khoản" error={errors?.userName?.message}>
                <Input
                  type="text"
                  id="userName"
                  disabled={isCreating}
                  placeholder="Nhập tên tài khoản..."
                  {...register("userName", {
                    required: "Vui lòng nhập tên tài khoản",
                    maxLength: {
                      value: 50,
                      message: "Tên tài khoản tối đa 50 kí tự",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                      message: "Tên tài khoản phải chứa ít nhất 5 kí tự, bao gồm chữ cái viết thường và ít nhất một chữ số",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Mật khẩu" error={errors?.password?.message}>
                <Input
                  type="password"
                  id="password"
                  disabled={isCreating}
                  placeholder="Nhập mật khẩu..."
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                    minLength: {
                      value: 8,
                      message: "Mật khẩu phải chứa ít nhất 8 kí tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Mật khẩu không được vượt quá 50 kí tự",
                    },
                  })}
                />
              </CustomFormRow>
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Thông tin cơ bản</div>
              </Header>
              <CustomFormRow label="Tên Cửa Hàng" error={errors?.storeName?.message}>
                <Input
                  type="text"
                  id="storeName"
                  disabled={isCreating}
                  placeholder="Nhập tên cửa hàng..."
                  {...register("storeName", {
                    required: "Vui lòng nhập tên cửa hàng",
                    validate: {
                      noWhiteSpace: (value) =>
                        value.trim().length >= 3 || "Tên cửa hàng phải chứa ít nhất 3 kí tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Tên cửa hàng không được vượt quá 50 kí tự",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Số điện thoại" error={errors?.phone?.message}>
                <Input
                  type="tel"
                  id="phone"
                  disabled={isCreating}
                  placeholder="Ví dụ: 0909339779"
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Số điện thoại hợp lệ phải từ 10 đến 11 số",
                    },
                  })}
                  onInput={handlePhoneInput}
                />
              </CustomFormRow>

              <CustomFormRow label="Email" error={errors?.email?.message}>
                <Input
                  type="email"
                  id="email"
                  disabled={isCreating}
                  placeholder="Nhập địa chỉ email..."
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^(?!\.)[a-zA-Z0-9]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
                      message: "Định dạng email không hợp lệ",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Mô tả" error={errors?.description?.message}>
                <Textarea
                  type="text"
                  id="description"
                  disabled={isCreating}
                  placeholder="Nhập mô tả..."
                  {...register("description", {
                    required: "Vui lòng nhập mô tả",
                    validate: {
                      noWhiteSpace: (value) => value.trim().length >= 3 || "Mô tả ít nhất 3 kí tự",
                    },
                    maxLength: {
                      value: 500,
                      message: "Mô tả tối đa 500 kí tự",
                    },
                  })}
                />
              </CustomFormRow>
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Địa chỉ</div>
              </Header>
              <CustomFormRow error={errors?.address?.message}>
                <Input
                  type="text"
                  id="address"
                  placeholder="Số nhà, đường, thôn/xóm/ấp, tổ/khu phố"
                  disabled={isCreating}
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ",
                    validate: {
                      noWhiteSpace: (value) => value.trim().length >= 3 || "Địa chỉ không hợp lệ",
                    },
                    maxLength: {
                      value: 200,
                      message: "Địa chỉ tối đa 200 kí tự",
                    },
                  })}
                />
              </CustomFormRow>
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
                disabled={isCreating}
              >
                <FileInput
                  id="avatar"
                  accept="image/*"
                  label="Chọn ảnh"
                  disabled={isCreating}
                  {...register("avatar", {
                    required: "Vui lòng thêm hình ảnh cho cửa hàng",
                  })}
                  onChange={handleAvatarChange}
                />
              </ReviewImageUpload>
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Khu vực</div>
              </Header>
              <CustomFormRow error={areaError}>
                <FormSelect
                  id="areaId"
                  placeholder={isLoadingAreas ? "Đang tải khu vực..." : "Chọn khu vực"}
                  disabled={isCreating || isLoadingAreas}
                  onChange={handleAreaOptions}
                  options={areaOptions}
                />
              </CustomFormRow>
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Thời gian làm việc</div>
              </Header>
              <TimeFrameContainer>
                <TimeFrameHalf>
                  <CustomFormRow label="Mở cửa" error={errors?.openingHours?.message}>
                    <Input
                      type="time"
                      id="openingHours"
                      disabled={isCreating}
                      {...register("openingHours", {
                        required: "Vui lòng thêm giờ mở cửa",
                      })}
                    />
                  </CustomFormRow>
                </TimeFrameHalf>

                <TimeFrameHalf>
                  <CustomFormRow label="Đóng cửa" error={errors?.closingHours?.message}>
                    <Input
                      type="time"
                      id="closingHours"
                      disabled={isCreating}
                      {...register("closingHours", {
                        required: "Vui lòng thêm giờ đóng cửa",
                        validate: validateClosingTime,
                      })}
                    />
                  </CustomFormRow>
                </TimeFrameHalf>
              </TimeFrameContainer>
            </StyledDataBox>
          </RightFormHalf>
        </StaffFormContainer>

        <CreateUpdateButton onClick={handleSubmit(onSubmit, onError)} isLoading={isCreating} label="Tạo cửa hàng" />
        {error && <div style={{ color: "red" }}>Lỗi: {error}</div>}
      </Form>
    </>
  );
}

export default StoreFormCreate;