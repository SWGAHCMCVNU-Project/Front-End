import { Avatar, Card, DatePicker, Spin, message } from "antd"; // Thêm message từ antd
import moment from "moment-timezone";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { NextPrevContext } from "../../../context/NextPrevContext";
import Input from "../../../ui/Input";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import { CustomFormEditorRow, CustomFormRow } from "../../../ui/custom/Form/InputItem/CustomFormItem";
import MyEditor from "../../../ui/custom/Form/TextEditor/MyEditor";
import { FormSelect } from "../../../ui/custom/Select/SelectBox/SelectForm";
import { useCampaignTypes } from "../../../hooks/campaign-type/useCampaignTypes";
import ReviewCampaignStore from "./review-campaign-store";
import ReviewCampaignVoucher from "./review-campaign-voucher";
import "./scss/campaign-review.scss";
import useCreateCampaign from "../../../hooks/campaign/useCreateCampaign";
import StorageService from "../../../services/storageService";
import { useNavigate } from "react-router-dom";

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
  flex: 1;
`;

const { RangePicker } = DatePicker;

// Hàm chuyển đổi ngày thành định dạng YYYY/MM/DD
const formatDateToObject = (date) => {
  const momentDate = moment(date);
  return momentDate.format("YYYY/MM/DD"); // Định dạng thành "2025/03/20"
};

function CampaignReview() {
  const { current, setCurrent, newCampaign } = useContext(NextPrevContext);
  const { mutate: createNewCampaign, isCreating, isSuccess } = useCreateCampaign(); // Giả định isSuccess từ hook
  const { campaignTypes } = useCampaignTypes();
  const [campaignTypesOptions, setCampaignTypesOptions] = useState([]);
  const navigate = useNavigate();

  const getDataSelectBox = () => {
    if (campaignTypes && Array.isArray(campaignTypes)) {
      const filteredCampaignTypes = campaignTypes.filter((c) => c.state);
      if (filteredCampaignTypes.length > 0) {
        setCampaignTypesOptions(
          filteredCampaignTypes.map((c) => ({ value: c.id, label: c.typeName }))
        );
      }
    }
  };

  useEffect(() => {
    getDataSelectBox();
  }, [campaignTypes]);

  const { register, handleSubmit, reset, getValues, setValue, formState } = useForm({
    defaultValues: newCampaign ? newCampaign : {},
  });
  const { errors } = formState;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (newCampaign?.typeId !== undefined) {
      setValue("typeId", newCampaign?.typeId);
    }
  }, [campaignTypesOptions, setValue, newCampaign]);

  // Hiển thị thông báo và điều hướng khi tạo thành công
  useEffect(() => {
    if (isSuccess) {
      message.success("Tạo thành công chiến dịch!"); // Thêm thông báo
      setTimeout(() => {
        navigate("/campaigns"); // Điều hướng sau 1 giây để người dùng thấy thông báo
      }, 1000);
    }
  }, [isSuccess, navigate]);

  function onSubmit(data) {
    const startOn = newCampaign?.startOn
      ? formatDateToObject(newCampaign.startOn)
      : formatDateToObject(new Date());
    const endOn = newCampaign?.endOn
      ? formatDateToObject(newCampaign.endOn)
      : formatDateToObject(new Date());

    const completeCampaignData = {
      ...newCampaign,
      brandId: StorageService.getBrandId() || "default-brand-id",
      typeId: newCampaign?.typeId || "default-type-id",
      campaignName: newCampaign?.campaignName || "Default Campaign",
      condition: newCampaign?.condition || "Default condition",
      description: newCampaign?.description || "Default description",
      startOn: startOn,
      endOn: endOn,
      totalIncome: newCampaign?.totalIncome ?? 0,
      storeIds: newCampaign?.storeIds || ["default-store-id"],
      link: newCampaign?.link || "",
      image: newCampaign?.image || null,
    };

    console.log("newCampaign:", newCampaign);
    console.log("completeCampaignData:", completeCampaignData);
    createNewCampaign(completeCampaignData);
  }

  function onError(errors) {
    console.log("Form errors:", errors);
  }

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <div>
        <Card className="card-noti">
          <div>
            <label>⚠️ Lưu ý: </label>
          </div>
          <div>
            <span>
              - Chuyên ngành, cửa hàng, cơ sở và ưu đãi sau khi tạo chiến dịch sẽ
              <strong className="note-strong"> không thể chỉnh sửa</strong>, vui lòng kiểm tra kĩ trước khi
              <strong className="note-strong"> tạo chiến dịch</strong>.
            </span>
          </div>
        </Card>
      </div>
      <div className="review-form-container">
        <div className="review-form">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <CampaignFormContainer>
              <LeftFormHalf>
                <StyledDataBox>
                  <Header>
                    <div>Thông tin cơ bản </div>
                  </Header>
                  <Avatar.Group className="avatar-review-campaign">
                    <Avatar
                      className="shape-review-avatar-campaign"
                      shape="square"
                      src={newCampaign?.image && URL.createObjectURL(newCampaign.image)}
                    />
                  </Avatar.Group>
                  <CustomFormRow label="Tên chiến dịch">
                    <Input
                      type="text"
                      id="campaignName"
                      disabled={isCreating}
                      placeholder="Tên chiến dịch..."
                      value={newCampaign?.campaignName || ""}
                      readOnly
                    />
                  </CustomFormRow>

                  <div className="review-img-date">
                    <div className="review-img-date-child">
                      <label>Thời gian diễn ra</label>
                      <RangePicker
                        id="startOn"
                        value={
                          newCampaign?.startOn && newCampaign?.endOn
                            ? [moment(newCampaign.startOn), moment(newCampaign.endOn)]
                            : undefined
                        }
                        disabled
                      />
                    </div>
                    <div className="review-img-date-child-2">
                      <label>Loại chiến dịch</label>
                      <FormSelect
                        id="typeId"
                        value={newCampaign?.typeId ? newCampaign.typeId : null}
                        options={campaignTypesOptions}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <CustomFormRow label="Link Website">
                    <Input
                      type="text"
                      id="link"
                      value={newCampaign?.link || ""}
                      disabled={isCreating}
                      placeholder="Link website..."
                      readOnly
                    />
                  </CustomFormRow>

                  <CustomFormRow label="Brand ID">
                    <Input
                      type="text"
                      id="brandId"
                      disabled={isCreating}
                      value={StorageService.getBrandId() || "N/A"}
                      readOnly
                    />
                  </CustomFormRow>

                  <CustomFormRow label="Total Income">
                    <Input
                      type="number"
                      id="totalIncome"
                      disabled={isCreating}
                      value={newCampaign?.totalIncome ?? 0}
                      readOnly
                    />
                  </CustomFormRow>

                  <CustomFormEditorRow label="Mô tả">
                    <MyEditor
                      id="description"
                      initialContent={newCampaign?.description ? newCampaign.description : ""}
                      disabled={true}
                    />
                  </CustomFormEditorRow>

                  <CustomFormEditorRow label="Thể lệ chiến dịch">
                    <MyEditor
                      id="condition"
                      initialContent={newCampaign?.condition ? newCampaign.condition : ""}
                      disabled={true}
                    />
                  </CustomFormEditorRow>
                </StyledDataBox>
                <div className="review-select-table">
                  <ReviewCampaignStore />
                  <ReviewCampaignVoucher />
                </div>
              </LeftFormHalf>
            </CampaignFormContainer>
          </Form>
        </div>
      </div>
      <div className="btn-next-prev">
        <ButtonNextPrev onClick={() => prev()} disabled={isCreating}>
          Quay lại
        </ButtonNextPrev>
        <ButtonCustom
          className="btn-next-form"
          onClick={handleSubmit(onSubmit, onError)}
          disabled={isCreating}
        >
          {isCreating ? <Spin /> : "Tạo chiến dịch"}
        </ButtonCustom>
      </div>
    </>
  );
}

export default CampaignReview;