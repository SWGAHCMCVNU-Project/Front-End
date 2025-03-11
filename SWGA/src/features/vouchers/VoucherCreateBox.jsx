import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import greenBean from "../../assets/images/dauxanh.png";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "./FormRow";
import FormRowUnit from "./FormRowUnit";
import ImageCard from "./ImageCard";
import TextEditor from "./components/TextEditor";
import { useCreateVoucher } from "../../hooks/voucher/useCreateVoucher";
import { useVoucherTypes } from "../../hooks/voucher-type/useVoucherTypes";
import { Select } from "antd";

const { Option } = Select;

const StyledStationDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem 4rem;
  box-shadow: var(--box-shadow);
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

const BrandFormContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const LeftFormHalf = styled.div`
  flex: 3;
`;

const RightFormHalf = styled.div`
  flex: 2;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  margin: 5px 1px 30px;
`;

const StyledImageBox = styled.section`
  background-color: var(--box-bg);
  padding: 30px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  margin-bottom: 3rem;
`;

const InputPriceUnit = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const LabelDes = styled.label`
  font-weight: 600;
`;

const CustomSelect = styled(Select)`
  .ant-select-selection-placeholder {
    flex: 1;
    overflow: hidden;
    color: #374151;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
    font-weight: 400;
  }
`;

function VoucherCreateBox({ onCloseModal }) {
  const navigate = useNavigate();
  const { isCreating, createVoucher } = useCreateVoucher();
  const { voucherTypes, isLoading: isLoadingTypes } = useVoucherTypes();

  const { register, handleSubmit, reset, getValues, setValue, formState } = useForm();
  const { errors } = formState;

  const [fileImageVoucherType, setFileImageVoucherType] = useState(null);
  const [voucherTypeError, setVoucherTypeError] = useState("");

  // Hàm validate giá
  const validatePrice = (value) => {
    if (!value) return "Hãy nhập giá ưu đãi";
    if (isNaN(value) || parseInt(value) <= 0) return "Giá ưu đãi phải là số nguyên dương";
    return true;
  };

  // Hàm validate tỉ lệ chuyển đổi
  const validateRate = (value) => {
    if (!value) return "Hãy nhập tỉ lệ chuyển đổi";
    if (isNaN(value) || parseFloat(value) < 1) return "Số lớn hơn hoặc bằng 1";
    if (!/^\d+(\.\d{0,2})?$/.test(value))
      return "Tỉ lệ chuyển đổi chỉ được nhập số thập phân sau dấu phẩy 2 chữ số";
    return true;
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileImageVoucherType(selectedFile);
  };

  const handleFileImageRemove = () => {
    setFileImageVoucherType(null);
    setValue("image", null);
  };

  const handleEditorConditionChange = (htmlContent) => {
    setValue("condition", htmlContent);
  };

  const handleEditorDescriptionChange = (htmlContent) => {
    setValue("description", htmlContent);
  };

  function onSubmit(data) {
    if (!data.typeId) {
      setVoucherTypeError("Vui lòng chọn thể loại");
      return;
    }

    const voucherData = {
      ...data,
      image: fileImageVoucherType,
      state: true,
    };

    console.log("Voucher data to send:", voucherData);

    createVoucher(voucherData, {
      onSuccess: () => {
        reset();
        setFileImageVoucherType(null);
        onCloseModal?.();
        navigate(`/vouchers`);
      },
    });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
        <ButtonGroup>
          <ButtonText onClick={() => navigate(`/vouchers`)}>← Quay lại</ButtonText>
          <Button disabled={isCreating}>Tạo ưu đãi mới</Button>
        </ButtonGroup>
        <BrandFormContainer>
          <LeftFormHalf>
            <StyledStationDataBox>
              <Header>
                <div>Thông tin khuyến mãi</div>
              </Header>
              <FormRow label="Tên ưu đãi" error={errors?.voucherName?.message}>
                <Input
                  type="text"
                  id="voucherName"
                  disabled={isCreating}
                  {...register("voucherName", {
                    required: "Hãy nhập tên ưu đãi",
                    maxLength: { value: 100, message: "Tên ưu đãi tối đa 100 kí tự" },
                    validate: (value) =>
                      value.trim().length >= 3 || "Tên ưu đãi ít nhất 3 kí tự",
                  })}
                />
              </FormRow>
              <LabelDes>Mô tả</LabelDes>
              <FormRow error={errors?.description?.message}>
                <TextEditor
                  id="description"
                  onContentChange={handleEditorDescriptionChange}
                  {...register("description", {
                    required: "Hãy nhập mô tả",
                    maxLength: { value: 1000, message: "Mô tả tối đa 1000 kí tự" },
                  })}
                />
              </FormRow>
              <LabelDes>Điều kiện</LabelDes>
              <FormRow error={errors?.condition?.message}>
                <TextEditor
                  id="condition"
                  onContentChange={handleEditorConditionChange}
                  {...register("condition", {
                    required: "Hãy nhập điều kiện",
                    maxLength: { value: 1000, message: "Điều kiện tối đa 1000 kí tự" },
                  })}
                />
              </FormRow>
            </StyledStationDataBox>
          </LeftFormHalf>
          <RightFormHalf>
            <StyledStationDataBox>
              <Header>
                <div>Thể loại ưu đãi</div>
              </Header>
              <FormRow error={voucherTypeError}>
                {isLoadingTypes ? (
                  <SpinnerMini />
                ) : (
                  <Select
                    id="typeId"
                    disabled={isCreating}
                    value={getValues("typeId")}
                    onChange={(value) => setValue("typeId", value, { shouldValidate: true })}
                    placeholder="Chọn thể loại"
                  >
                    {voucherTypes?.data?.items?.map((type) => (
                      <Option key={type.id} value={type.id}>
                        {type.typeName}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormRow>
            </StyledStationDataBox>
            <StyledStationDataBox>
              <Header>
                <div>Giá ưu đãi</div>
              </Header>
              <FormRowUnit error={errors?.price?.message} icon={greenBean}>
                <InputPriceUnit
                  type="number"
                  id="price"
                  disabled={isCreating}
                  {...register("price", { validate: validatePrice })}
                />
              </FormRowUnit>
            </StyledStationDataBox>
            <StyledStationDataBox>
              <Header>
                <div>Tỉ lệ chuyển đổi</div>
              </Header>
              <FormRow error={errors?.rate?.message}>
                <Input
                  type="text"
                  id="rate"
                  disabled={isCreating}
                  {...register("rate", { validate: validateRate })}
                />
              </FormRow>
            </StyledStationDataBox>
            <StyledImageBox>
              <Header>
                <div>Ảnh ưu đãi</div>
              </Header>
              <ImageCard
                file={fileImageVoucherType}
                fileRemove={handleFileImageRemove}
                error={errors?.image?.message}
              >
                <FileInput
                  id="image"
                  accept="image/*"
                  {...register("image", { required: "Thêm ảnh ưu đãi" })}
                  onChange={handleImageChange}
                />
              </ImageCard>
            </StyledImageBox>
          </RightFormHalf>
        </BrandFormContainer>
        <FormRow>
          <Button $variations="secondary" type="reset" onClick={() => onCloseModal?.()}>
            Hủy bỏ
          </Button>
          <Button disabled={isCreating}>Tạo ưu đãi mới</Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default VoucherCreateBox;