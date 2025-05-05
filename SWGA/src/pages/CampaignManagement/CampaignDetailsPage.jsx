// CampaignDetailsPage.jsx
import { Card, Col, Row, Tabs } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CampaignDescription from "../../features/campaigns/CampaignDetailPage/campaign-description/campaign-description";
import CampaignImage from "../../features/campaigns/CampaignDetailPage/campaign-image/campaign-image";
import CampaignInformation from "../../features/campaigns/CampaignDetailPage/campaign-information/campaign-information";
import CampaignLogoBrand from "../../features/campaigns/CampaignDetailPage/campaign-logo-brand/campaign-logo-brand";
import CampaignStore from "../../features/campaigns/CampaignDetailPage/campaign-tab/campaign-store";
import CampaignVoucher from "../../features/campaigns/CampaignDetailPage/campaign-tab/campaign-voucher";
import ItemFilter from "../../features/campaigns/CampaignDetailPage/campaign-tab/filter-item";
import { CampaignUpdateState } from "../../features/campaigns/CampaignDetailPage/campaign-update-state/campaign-update-state";
import { CampaignStoreProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignStore";
import { CampaignVoucherProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignVoucher";
import { CampaignVoucherItemProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignVoucherItem";
import storageService from "../../services/storageService";
import ButtonText from "../../ui/ButtonText";
import ButtonCustom from "../../ui/custom/Button/ButtonCustom";
import useGetCampaignById from "../../hooks/campaign/useGetCampaignById";
import "./scss/CampaignDetailsPage.scss";

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const LeftActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StateUpdateWrapper = styled.div`
  margin-top: 16px;
`;

function CampaignDetailsPage() {
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const role = storageService.getRoleLogin();
    const [activeOption, setActiveOption] = useState("campaignVoucher");

    const { data: campaign, isLoading } = useGetCampaignById(campaignId);

    const normalizeStatus = (status) => {
        if (status === undefined || status === null) return 0;
        const parsed = parseInt(status);
        return [0, 1, 2, 3].includes(parsed) ? parsed : 0;
    };
    
    const normalizedCampaign = campaign 
        ? {
            ...campaign,
            status: normalizeStatus(campaign.status)
          }
        : null;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    const campaignStartDate = normalizedCampaign?.startOn
        ? typeof normalizedCampaign.startOn === "string"
            ? new Date(normalizedCampaign.startOn)
            : new Date(
                  normalizedCampaign.startOn.year,
                  normalizedCampaign.startOn.month - 1,
                  normalizedCampaign.startOn.day
              )
        : null;

    const formattedCampaignStartDate = campaignStartDate
        ? `${campaignStartDate.getFullYear()}-${String(campaignStartDate.getMonth() + 1).padStart(2, "0")}-${String(campaignStartDate.getDate()).padStart(2, "0")}`
        : null;

    const itemsTab = [
        {
            label: "Ưu đãi",
            key: "campaignVoucher",
            children: (
                <CampaignVoucherProvider>
                    <CampaignVoucher />
                </CampaignVoucherProvider>
            ),
        },
        {
            label: "Đơn hàng",
            key: "campaignVoucherItem",
            children: (
                <CampaignVoucherItemProvider>
                    <div className="tabled">
                        <Row gutter={[24, 0]}>
                            <Col xs={24} xl={24}>
                                <Card bordered={false} className="criclebox tablespace mb-24">
                                    <ItemFilter />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </CampaignVoucherItemProvider>
            ),
        },
        {
            label: "Cửa hàng",
            key: "campaignStore",
            children: (
                <CampaignStoreProvider>
                    <div className="tabled">
                        <Row>
                            <Col xl={24}>
                                <Card
                                    bordered={false}
                                    className="criclebox tablespace mb-24"
                                    title="Danh sách cửa hàng tổ chức"
                                >
                                    <CampaignStore />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </CampaignStoreProvider>
            ),
        },
    ];

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="title-table-list">
                <Title className="title-name-table-list" level={2}>
                    Chi tiết chiến dịch
                </Title>
            </div>

            <ButtonContainer>
                <LeftActions>
                    <ButtonText onClick={() => navigate("/campaigns")}>
                        ← Quay lại
                    </ButtonText>
                </LeftActions>

                <RightActions>
                    {role === "brand" &&
                    formattedCampaignStartDate &&
                    formattedDate < formattedCampaignStartDate &&
                    normalizedCampaign?.status !== 3 && (
                        <Link
                            className="link-navigate"
                            to={`/campaigns/edit/${campaignId}`}
                            state={{ campaign: normalizedCampaign }}
                        >
                            <ButtonCustom>
                                <StyledContainerButton>
                                    <StyledButton>
                                        <HiPencil />
                                    </StyledButton>
                                    Chỉnh sửa
                                </StyledContainerButton>
                            </ButtonCustom>
                        </Link>
                    )}
                </RightActions>
            </ButtonContainer>

            <StateUpdateWrapper>
                {normalizedCampaign && <CampaignUpdateState campaign={normalizedCampaign} />}
            </StateUpdateWrapper>

            <Row className="campaign-row-tab">
                <Col xl={24}>
                    <Card className="product-details-card">
                        <div className="campaign-flex-layout">
                            <Col xl={9} className="campaign-image-layout">
                                <CampaignImage campaign={normalizedCampaign} />
                            </Col>
                            <Col xl={15} className="campaign-information-layout">
                                <div>
                                    <CampaignLogoBrand campaign={normalizedCampaign} />
                                    <CampaignDescription campaign={normalizedCampaign} />
                                </div>
                                <div>
                                    <hr className="line-break-product-details" />
                                </div>
                                <div>
                                    <CampaignInformation campaign={normalizedCampaign} />
                                </div>
                            </Col>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row className="campaign-row-tabs">
                <Tabs defaultActiveKey="campaignVoucher" items={itemsTab} />
            </Row>
        </>
    );
}

export default CampaignDetailsPage;