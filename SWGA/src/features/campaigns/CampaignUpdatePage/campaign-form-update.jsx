/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"; // Thêm useNavigate
import styled, { css } from "styled-components";
import toast from "react-hot-toast"; // Thêm react-hot-toast
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import FileInput from "../../../ui/FileInput";
import Input from "../../../ui/Input";
import SpinnerMini from "../../../ui/SpinnerMini";
import { CreateUpdateButton } from "../../../ui/custom/Button/Button";
import { CustomFormEditorRow, CustomFormRow } from "../../../ui/custom/Form/InputItem/CustomFormItem";
import MyEditor from "../../../ui/custom/Form/TextEditor/MyEditor";
import { SelectForm } from "../../../ui/custom/Select/SelectBox/SelectForm";
import { ReviewImageUpload } from "../../../ui/custom/Upload/UploadImage";
import { useCampaignTypes } from "../../../hooks/campaign-type/useCampaignTypes";
import useUpdateCampaign from "../../../hooks/campaign/useUpdateCampaign";

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
  overflow: hidden;
  font-size: 1.4rem;
`;

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

const CampaignFormContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const LeftFormHalf = styled.div`
  flex: 4;
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

function CampaignFormUpdate() {
  const moveBack = useMoveBack();
  const navigate = useNavigate(); // Thêm useNavigate để điều hướng
  const { isEditing, editCampaign } = useUpdateCampaign();
  const location = useLocation();
  const [campaignToEdit, setCampaignToEdit] = useState(location.state?.campaign);
  const { campaignTypes } = useCampaignTypes();
  const [campaignTypesOptions, setcampaignTypesOptions] = useState([]);
  const [campaignTypesValid, setcampaignTypeValid] = useState(null);
  const [fileCard, setFileCard] = useState(null);

  const {
    id: editId,
    ...editValues
  } = campaignToEdit || {};

  const getDataSelectBox = () => {
    if (campaignTypes && Array.isArray(campaignTypes)) {
      const filteredCampaignTypes = campaignTypes.filter(c => c.state);
      if (filteredCampaignTypes.length > 0) {
        setcampaignTypesOptions(filteredCampaignTypes.map(c => ({ value: c.id, label: c.typeName })));
        const check = filteredCampaignTypes.find((type) => type.id === editValues.typeId);
        if (check) {
          setcampaignTypeValid(check.id);
        }
      }
    }
  };

  useEffect(() => {
    getDataSelectBox();
  }, [campaignTypes]);

  const { register, handleSubmit, reset, getValues, setValue, formState } = useForm({
    defaultValues: editValues
  });
  const { errors } = formState;

  const handleCampaignTypesOptionUpdate = (selectedOption) => {
    setValue("typeId", selectedOption, {
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
    setValue("image", editValues?.image);
  };

  const handleDescriptionChange = (htmlContent) => {
    setValue("description", htmlContent);
  };

  const handleConditionChange = (htmlContent) => {
    setValue("condition", htmlContent);
  };

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const link = data.link !== null ? data.link : "";
    editCampaign(
      { campaignId: editId, campaignData: { ...data, link: link, image } },
      {
        onSuccess: (data) => {
          setCampaignToEdit(data);
          // Hiển thị toast thông báo thành công
          toast.success("Cập nhật chiến dịch thành công");
          // Điều hướng về /campaigns/:campaignId sử dụng editId
          navigate(`/campaigns/${editId}`);
        },
        onError: (error) => {
          console.error("Error in onSubmit:", error);
          // Hiển thị toast thông báo lỗi (tùy chọn)
          toast.error("Cập nhật chiến dịch thất bại");
        }
      }
    );
  }

  function onError(errors) {
    console.log("Validation errors:", errors);
  }

  return (
    <>
      <ButtonGroup>
        <ButtonText onClick={moveBack}>
          ← Quay lại
        </ButtonText>
      </ButtonGroup>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CampaignFormContainer>
          <LeftFormHalf>
            <StyledDataBox>
              <Header>
                <div>Thông tin cơ bản </div>
              </Header>
              <CustomFormRow
                label="Tên chiến dịch"
                error={errors?.campaignName?.message}
              >
                <Input
                  type="text"
                  id="campaignName"
                  disabled={isEditing}
                  placeholder="Nhập tên chiến dịch..."
                  {...register("campaignName", {
                    required: "Vui lòng nhập tên chiến dịch",
                    validate: {
                      noWhiteSpace: (value) =>
                        value.trim().length >= 3 || "Tên chiến dịch ít nhất 3 kí tự"
                    },
                    maxLength: {
                      value: 100,
                      message: "Tên chiến dịch tối đa 100 kí tự"
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow
                label="Link Website (nếu có)"
                error={errors?.link?.message}
              >
                <Input
                  type="text"
                  id="link"
                  disabled={isEditing}
                  placeholder="Nhập link website..."
                  {...register("link")}
                />
              </CustomFormRow>

              <CustomFormEditorRow
                label="Mô tả"
                error={errors?.description?.message}
              >
                <MyEditor
                  id="description"
                  initialContent={editValues?.description ? editValues.description : ""}
                  onContentChange={handleDescriptionChange}
                  {...register("description", {
                    required: "Vui lòng nhập mô tả",
                    validate: {
                      noWhiteSpace: (value) => {
                        const cleanedValue = value.replace(/\s| /g, "");
                        return cleanedValue.length >= 10 || "Mô tả ít nhất 3 kí tự";
                      }
                    },
                    maxLength: {
                      value: 1000,
                      message: "Mô tả tối đa 1000 kí tự"
                    },
                  })}
                  disabled={isEditing}
                />
              </CustomFormEditorRow>
            </StyledDataBox>

            <StyledDataBox>
              <CustomFormEditorRow
                label="Thể lệ chiến dịch"
                error={errors?.condition?.message}
              >
                <MyEditor
                  id="condition"
                  initialContent={editValues?.condition ? editValues.condition : ""}
                  onContentChange={handleConditionChange}
                  {...register("condition", {
                    required: "Vui lòng nhập điều kiện",
                    validate: {
                      noWhiteSpace: (value) => {
                        const cleanedValue = value.replace(/\s| /g, "");
                        return cleanedValue.length >= 10 || "Thể lệ ít nhất 3 kí tự";
                      }
                    },
                    maxLength: {
                      value: 1000,
                      message: "Thể lệ tối đa 1000 kí tự"
                    }
                  })}
                  disabled={isEditing}
                />
              </CustomFormEditorRow>
            </StyledDataBox>
          </LeftFormHalf>

          <RightFormHalf>
            <StyledDataBox>
              <Header>
                <div>Hình ảnh</div>
              </Header>
              <ReviewImageUpload
                label="Ảnh chiến dịch"
                error={errors?.image?.message}
                file={fileCard}
                fileRemove={handleAvatarRemove}
                disabled={isEditing}
                image={editValues?.image}
                edit={true}
              >
                <FileInput
                  id="image"
                  accept="image/*"
                  label="Chọn ảnh"
                  disabled={isEditing}
                  {...register("image", {
                    required:
                      !getValues("image") || getValues("image").length === 0
                        ? "Vui lòng thêm hình ảnh cho chiến dịch"
                        : false,
                  })}
                  onChange={handleAvatarChange}
                />
              </ReviewImageUpload>
            </StyledDataBox>

            <StyledDataBox>
              <Header>
                <div>Loại chiến dịch</div>
              </Header>
              {campaignTypesOptions.length > 0 ? (
                <CustomFormRow error={errors?.typeId?.message}>
                  <SelectForm
                    id="typeId"
                    value={
                      editValues.typeId === campaignTypesValid
                        ? editValues.typeId
                        : "Loại chiến dịch không hợp lệ, vui lòng cập nhật"
                    }
                    {...register("typeId")}
                    disabled={isEditing}
                    onChange={handleCampaignTypesOptionUpdate}
                    options={campaignTypesOptions}
                  />
                </CustomFormRow>
              ) : (
                <SpinnerMini />
              )}
            </StyledDataBox>
          </RightFormHalf>
        </CampaignFormContainer>
      </Form>

      <CreateUpdateButton
        onClick={handleSubmit(onSubmit, onError)}
        isLoading={isEditing}
        label="Lưu thay đổi"
      />
    </>
  );
}

export default CampaignFormUpdate;