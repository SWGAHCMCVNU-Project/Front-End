import { Avatar, Card, DatePicker, Spin, message } from "antd";
import moment from "moment-timezone";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { NextPrevContext } from "../../../context/NextPrevContext";
import Input from "../../../ui/Input";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import {
  CustomFormEditorRow,
  CustomFormRow,
} from "../../../ui/custom/Form/InputItem/CustomFormItem";
import MyEditor from "../../../ui/custom/Form/TextEditor/MyEditor";
import { FormSelect } from "../../../ui/custom/Select/SelectBox/SelectForm";
import { useCampaignTypes } from "../../../hooks/campaign-type/useCampaignTypes";
import CampaignStore from "./CampaignStore";
import CampaignVoucher from "./CampaignVoucher";
import walletService from "../../../store/api/walletApi";
import "./scss/campaign.scss";
import useCreateCampaign from "../../../hooks/campaign/useCreateCampaign";
import StorageService from "../../../services/storageService";
import greenBean from "../../../assets/images/dauxanh.png";
import toast from "react-hot-toast";
import { formatCurrency } from "../../../utils/helpers";

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
  flex: 1;
`;

const TotalCostContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 600;
  color: #1c5d78;
`;

const TotalCostBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const CostRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CostLabel = styled.span`
  font-weight: 500;
`;

const CostWithIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const TotalCostValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const { RangePicker } = DatePicker;

const formatDateToObject = (date) => {
  const momentDate = moment(date);
  return momentDate.format("YYYY/MM/DD");
};

const convertCampaignDetailsToString = (details) => {
  if (!Array.isArray(details) || details.length === 0) return "";
  return JSON.stringify(details);
};

function CampaignReview() {
  const { current, setCurrent, newCampaign } = useContext(NextPrevContext);
  const { mutate: createNewCampaign, isCreating } = useCreateCampaign();
  const { campaignTypes } = useCampaignTypes();
  const { handleSubmit, setValue } = useForm({
    defaultValues: newCampaign ? newCampaign : {},
  });
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    if (newCampaign?.typeId !== undefined) {
      setValue("typeId", newCampaign?.typeId);
    }
  }, [setValue, newCampaign]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const walletData = await walletService.getWalletByBrandId();
        setWalletBalance(walletData.balance);
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        setWalletBalance(0);
        toast.error("Không thể tải số dư ví");
      }
    };

    fetchWalletBalance();
  }, []);

  function onSubmit() {
    const startOn = newCampaign?.startOn
      ? formatDateToObject(newCampaign.startOn)
      : formatDateToObject(new Date());
    const endOn = newCampaign?.endOn
      ? formatDateToObject(newCampaign.endOn)
      : formatDateToObject(new Date());

    const campaignDetailsString = convertCampaignDetailsToString(
      newCampaign?.campaignDetails
    );

    const totalCost =
      (newCampaign?.cost || 0) + (newCampaign?.campaignTypeCoin || 0);
    if (walletBalance !== null && totalCost > walletBalance) {
      toast.error(
        `Số dư ví không đủ! Cần ${totalCost} điểm, nhưng ví chỉ có ${walletBalance} điểm.`
      );
      return;
    }

    const completeCampaignData = {
      ...newCampaign,
      brandId: StorageService.getBrandId(),
      typeId: newCampaign?.typeId,
      campaignName: newCampaign?.campaignName,
      condition: newCampaign?.condition,
      description: newCampaign?.description,
      startOn: startOn,
      endOn: endOn,
      totalIncome: totalCost,
      storeIds: newCampaign?.storeIds || [],
      link: newCampaign?.link || "",
      image: newCampaign?.image || null,
      campaignDetails: campaignDetailsString,
    };

    createNewCampaign(completeCampaignData);
  }

  function onError() {
    message.error("Vui lòng kiểm tra lại thông tin biểu mẫu!");
  }

  const prev = () => {
    setCurrent(current - 1);
  };

  const voucherCost = newCampaign?.cost || 0;
  const campaignTypeCost = newCampaign?.campaignTypeCoin || 0;
  const totalCampaignCost = voucherCost + campaignTypeCost;

  return (
    <>
      <div>
        <Card className="card-noti">
          <div>
            <label>⚠️ Lưu ý: </label>
          </div>
          <div>
            <span>
              - Nơi tổ chức chiến dịch và ưu đãi sau khi tạo chiến dịch sẽ
              <strong className="note-strong"> không thể chỉnh sửa</strong>, vui
              lòng kiểm tra kĩ trước khi
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
                      src={
                        newCampaign?.image &&
                        URL.createObjectURL(newCampaign.image)
                      }
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
                            ? [
                                moment(newCampaign.startOn),
                                moment(newCampaign.endOn),
                              ]
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
                        options={campaignTypes
                          ?.filter((c) => c.state)
                          .map((c) => ({
                            value: c.id,
                            label: c.typeName,
                          }))}
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

                  <CustomFormEditorRow label="Mô tả">
                    <MyEditor
                      id="description"
                      initialContent={
                        newCampaign?.description ? newCampaign.description : ""
                      }
                      disabled={true}
                    />
                  </CustomFormEditorRow>

                  <CustomFormEditorRow label="Thể lệ chiến dịch">
                    <MyEditor
                      id="condition"
                      initialContent={
                        newCampaign?.condition ? newCampaign.condition : ""
                      }
                      disabled={true}
                    />
                  </CustomFormEditorRow>
                </StyledDataBox>
                <div className="review-select-table">
                  <StyledDataBox>
                    <div className="review-section store-section">
                      <CampaignStore mode="review" />
                    </div>
                  </StyledDataBox>
                  <StyledDataBox>
                    <div className="review-section voucher-section">
                      <CampaignVoucher mode="review" />
                    </div>
                    <TotalCostContainer>
                      <TotalCostBreakdown>
                        <CostRow>
                          <CostLabel>Chi phí voucher:</CostLabel>
                          <CostWithIcon>
                            {formatCurrency(voucherCost)}
                            <img
                              className="shape-avatar-campaign-bean"
                              src={greenBean}
                              alt="bean"
                            />
                          </CostWithIcon>
                        </CostRow>
                        <CostRow>
                          <CostLabel>Chi phí loại chiến dịch:</CostLabel>
                          <CostWithIcon>
                            {formatCurrency(campaignTypeCost)}
                            <img
                              className="shape-avatar-campaign-bean"
                              src={greenBean}
                              alt="bean"
                            />
                          </CostWithIcon>
                        </CostRow>
                        <CostRow>
                          <CostLabel>Tổng:</CostLabel>
                          <TotalCostValue>
                            {formatCurrency(totalCampaignCost)}
                            <img
                              className="shape-avatar-campaign-bean"
                              src={greenBean}
                              alt="bean"
                            />
                          </TotalCostValue>
                        </CostRow>
                      </TotalCostBreakdown>
                    </TotalCostContainer>
                  </StyledDataBox>
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
