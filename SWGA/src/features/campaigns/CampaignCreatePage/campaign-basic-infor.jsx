import { Card } from "antd";
import { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { NextPrevContext } from "../../../context/NextPrevContext";
import storageService from "../../../services/storageService";
import FileInput from "../../../ui/FileInput";
import Input from "../../../ui/Input";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import {
  CustomFormEditorRow,
  CustomFormRow,
} from "../../../ui/custom/Form/InputItem/CustomFormItem";
import MyEditor from "../../../ui/custom/Form/TextEditor/MyEditor";
import { ReviewImageUpload } from "../../../ui/custom/Upload/UploadImage";
import "./scss/campaign.scss";

// Hàm trích xuất văn bản thuần từ HTML
const stripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const StyledDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem 4rem;
  overflow: hidden;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
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
  color: #1c5d78;
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

function CampaignBasicInformation() {
  const [fileCard, setFileCard] = useState(null);
  const {
    newCampaign,
    setNewCampaign,
    current,
    setCurrent,
    completedSteps,
    setCompletedSteps,
  } = useContext(NextPrevContext);
  const brandId = storageService.getLoginId();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    window.scrollTo(0, 0);
    return () => {
      isMounted.current = false;
    };
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState,
  } = useForm({
    defaultValues: newCampaign
      ? {
          campaignName: newCampaign.campaignName || "",
          link: newCampaign.link || "",
          description: newCampaign.description || "",
          condition: newCampaign.condition || "",
          image: newCampaign.image || null,
        }
      : {
          campaignName: "",
          link: "",
          description: "",
          condition: "",
          image: null,
        },
  });
  const { errors } = formState;

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileCard(selectedFile);
    if (isMounted.current) {
      setValue("image", selectedFile, { shouldValidate: true });
    }
  };

  const handleAvatarRemove = () => {
    setFileCard(null);
    if (isMounted.current) {
      setValue("image", null, { shouldValidate: true });
    }
  };

  const handleDescriptionChange = (htmlContent) => {
    if (isMounted.current) {
      setValue("description", htmlContent, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleConditionChange = (htmlContent) => {
    if (isMounted.current) {
      setValue("condition", htmlContent, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const validateCampaign = (data) => {
    const errors = [];

    if (!brandId) {
      errors.push("Brand ID is required");
    }

    if (!data.campaignName || data.campaignName.trim().length < 3) {
      errors.push("Tên chiến dịch ít nhất 3 kí tự");
    }

    if (data.link && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(data.link)) {
      errors.push("Link phải đúng định dạng (ví dụ: https://example.com)");
    }

    const descriptionText = stripHtml(data.description);
    if (!descriptionText || descriptionText.length < 10) {
      errors.push("Mô tả ít nhất 10 kí tự");
    } else if (descriptionText.length > 1000) {
      errors.push("Mô tả tối đa 1000 kí tự");
    }

    const conditionText = stripHtml(data.condition);
    if (!conditionText || conditionText.length < 10) {
      errors.push("Thể lệ ít nhất 10 kí tự");
    } else if (conditionText.length > 1000) {
      errors.push("Thể lệ tối đa 1000 kí tự");
    }

    if (!data.image && !fileCard) {
      errors.push("Vui lòng thêm hình ảnh cho chiến dịch");
    }

    return errors.length === 0 ? null : errors;
  };

  function onSubmit(data) {
    const validationErrors = validateCampaign(data);
    if (validationErrors) {
      return;
    }

    if (isMounted.current) {
      setNewCampaign({
        ...newCampaign,
        ...data,
        brandId: brandId,
        image: fileCard || data.image,
      });
      setCompletedSteps((prev) => [...new Set([...prev, 0])]);
      setCurrent(current + 1);
    }
  }

  function onError(errors) {
    // console.log("Form errors:", errors);
  }

  return (
    <>
      <div>
        <Card className="card-noti">
          <div>
            <label>⚠️ Lưu ý: </label>
          </div>
          <div className="notification-create">
            <span>
              - Ở bước tiếp theo, để tạo chiến dịch thành công, bạn cần có sẵn cửa
              hàng và phiếu ưu đãi hợp lệ trên hệ thống. Nếu bạn đã có sẵn, vui
              lòng bỏ qua thông báo này.
            </span>
            <span>
              - Xem danh sách cửa hàng của bạn{" "}
              <Link
                style={{ color: "#1c5d78" }}
                className="link-noti"
                to={"/stores"}
              >
                tại đây
              </Link>
              .
            </span>
            <span>
              - Xem phiếu ưu đãi của bạn{" "}
              <Link
                style={{ color: "#1c5d78" }}
                className="link-noti"
                to={"/voucher-items"}
              >
                tại đây
              </Link>
              .
            </span>
          </div>
        </Card>
      </div>
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
                  placeholder="Nhập tên chiến dịch..."
                  {...register("campaignName", {
                    required: "Vui lòng nhập tên chiến dịch",
                    validate: {
                      noWhiteSpace: (value) =>
                        value.trim().length >= 3 ||
                        "Tên chiến dịch ít nhất 3 kí tự",
                    },
                    maxLength: {
                      value: 100,
                      message: "Tên chiến dịch tối đa 100 kí tự",
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
                  placeholder="Nhập link website..."
                  {...register("link", {
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message:
                        "Link phải đúng định dạng (ví dụ: https://example.com)",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormEditorRow
                label="Mô tả"
                error={errors?.description?.message}
              >
                <MyEditor
                  id="description"
                  initialContent={newCampaign?.description || ""}
                  onContentChange={handleDescriptionChange}
                  {...register("description", {
                    required: "Vui lòng nhập mô tả",
                    validate: {
                      noWhiteSpace: (value) => {
                        const plainText = stripHtml(value);
                        return (
                          plainText.length >= 10 || "Mô tả ít nhất 10 kí tự"
                        );
                      },
                      maxLength: (value) => {
                        const plainText = stripHtml(value);
                        return (
                          plainText.length <= 1000 || "Mô tả tối đa 1000 kí tự"
                        );
                      },
                    },
                  })}
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
                  initialContent={newCampaign?.condition || ""}
                  onContentChange={handleConditionChange}
                  {...register("condition", {
                    required: "Vui lòng nhập thể lệ",
                    validate: {
                      noWhiteSpace: (value) => {
                        const plainText = stripHtml(value);
                        return (
                          plainText.length >= 10 || "Thể lệ ít nhất 10 kí tự"
                        );
                      },
                      maxLength: (value) => {
                        const plainText = stripHtml(value);
                        return (
                          plainText.length <= 1000 || "Thể lệ tối đa 1000 kí tự"
                        );
                      },
                    },
                  })}
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
                image={newCampaign?.image}
                edit={false}
              >
                <FileInput
                  id="image"
                  accept="image/*"
                  label="Chọn ảnh"
                  {...register("image")}
                  onChange={handleAvatarChange}
                />
              </ReviewImageUpload>
            </StyledDataBox>
          </RightFormHalf>
        </CampaignFormContainer>
      </Form>

      <div className="btn-next-prev">
        <ButtonNextPrev onClick={handleSubmit(onSubmit, onError)}>
          Tiếp theo
        </ButtonNextPrev>
      </div>
    </>
  );
}

export default CampaignBasicInformation;