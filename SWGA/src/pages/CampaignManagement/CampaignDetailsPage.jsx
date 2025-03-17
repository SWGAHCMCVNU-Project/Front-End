import { Card, Col, Popover, Row, Tabs } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CampaignDescription from "../../features/campaigns/CampaignDetailPage/campaign-description/campaign-description";
import CampaignImage from "../../features/campaigns/CampaignDetailPage/campaign-image/campaign-image";
import CampaignInformation from "../../features/campaigns/CampaignDetailPage/campaign-information/campaign-information";
import CampaignLogoBrand from "../../features/campaigns/CampaignDetailPage/campaign-logo-brand/campaign-logo-brand";
import CampaignActivity from "../../features/campaigns/CampaignDetailPage/campaign-tab/campaign-activity";
import CampaignCampus from "../../features/campaigns/CampaignDetailPage/campaign-tab/campaign-campus";
import CampaignStore from "../../features/campaigns/CampaignDetailPage/campaign-tab/campaign-store";
import CampaignVoucher from "../../features/campaigns/CampaignDetailPage/campaign-tab/campaign-voucher";
import ItemFilter from "../../features/campaigns/CampaignDetailPage/campaign-tab/filter-item";
import { CampaignUpdateState } from "../../features/campaigns/CampaignDetailPage/campaign-update-state/campaign-update-state";
import { CampaignActivityProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignActivity";
import { CampaignCampusProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignCampus";
import { CampaignStoreProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignStore";
import { CampaignVoucherProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignVoucher";
import { CampaignVoucherItemProvider } from "../../features/campaigns/CampaignDetailPage/useCampaignVoucherItem";
import storageService from "../../services/storageService";
import ButtonText from "../../ui/ButtonText";
import ButtonCustom from "../../ui/custom/Button/ButtonCustom";
import useGetCampaignById from "../../hooks/campaign/useGetCampaignById"; // Import hook lấy chi tiết campaign
import useUpdateCampaign from "../../hooks/campaign/useUpdateCampaign"; // Import hook cập nhật campaign
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

function CampaignDetailsPage() {
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const role = storageService.getRoleLogin();
    const [visible, setVisible] = useState(false);
    const [activeOption, setActiveOption] = useState("campaignCampus");

    // Lấy dữ liệu campaign bằng useGetCampaignById
    const { data: campaign, isLoading: isLoadingCampaign } = useGetCampaignById(campaignId);

    // Hook để cập nhật campaign
    const { mutate: updateCampaign, isLoading: isUpdating } = useUpdateCampaign();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const CampaignCampuses = () => (
        <CampaignCampusProvider>
            <Card bordered={false} className="criclebox tablespace mb-24" title="Danh sách cơ sở tổ chức">
                <CampaignCampus />
            </Card>
        </CampaignCampusProvider>
    );

    const handleTabClick = (option) => {
        setVisible(false);
        setActiveOption(option);
    };

    const content = (
        <div className="tab-options">
            <div
                className={`tab-option ${activeOption === "campaignCampus" ? "active" : ""}`}
                onClick={() => handleTabClick("campaignCampus")}
            >
                Cơ sở
            </div>
        </div>
    );

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
        {
            label: (
                <Popover
                    content={content}
                    open={visible}
                    onOpenChange={setVisible}
                    trigger="click"
                    placement="bottom"
                >
                    <div>Đối tượng</div>
                </Popover>
            ),
            key: "campaignCampusStore",
            children: <CampaignCampuses />,
        },
        {
            label: "Lịch sử",
            key: "campaignActivity",
            children: (
                <CampaignActivityProvider>
                    <div className="tabled">
                        <Row>
                            <Col xl={24}>
                                <Card
                                    bordered={false}
                                    className="criclebox tablespace mb-24"
                                    title="Trạng thái đã trải qua"
                                >
                                    <CampaignActivity />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </CampaignActivityProvider>
            ),
        },
    ];

    // Hàm xử lý cập nhật trạng thái campaign
    const handleUpdateState = (newStateId) => {
        const updatedCampaign = {
            id: campaignId,
            params: {
                stateId: newStateId, // Giả sử API yêu cầu stateId
                // Các tham số khác nếu cần (ví dụ: reason)
            },
        };
        updateCampaign(updatedCampaign, {
            onSuccess: () => {
                console.log("Cập nhật trạng thái thành công!");
            },
            onError: (err) => {
                console.error("Lỗi khi cập nhật trạng thái:", err);
            },
        });
    };

    if (isLoadingCampaign) return <div>Loading...</div>; // Hiển thị loading khi đang lấy dữ liệu

    return (
        <>
            <div className="title-table-list">
                <Title className="title-name-table-list" level={2}>
                    Chi tiết chiến dịch
                </Title>
            </div>
            <div className="btn-header">
                <div className="btn-nav-camp-details">
                    <ButtonText onClick={() => navigate("/campaigns")}>← Quay lại</ButtonText>
                    {role === "brand" &&
                    (campaign?.startOn > formattedDate && campaign?.currentStateId === 7) ? null : (
                        role === "brand" &&
                        campaign?.startOn > formattedDate && (
                            <Link
                                className="link-navigate"
                                to={`/campaigns/edit/${campaignId}`}
                                state={{ campaign }}
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
                        )
                    )}
                </div>
                <div>
                    {/* Truyền handleUpdateState vào CampaignUpdateState */}
                    <CampaignUpdateState isUpdating={isUpdating} onUpdateState={handleUpdateState} />
                </div>
            </div>

            <Row className="campaign-row-tab">
                <Col xl={24}>
                    <Card className="product-details-card">
                        <div className="campaign-flex-layout">
                            <Col xl={9} className="campaign-image-layout">
                                <CampaignImage campaign={campaign} /> {/* Truyền campaign qua props */}
                            </Col>
                            <Col xl={15} className="campaign-information-layout">
                                <div>
                                    <CampaignLogoBrand campaign={campaign} /> {/* Truyền campaign qua props */}
                                    <CampaignDescription campaign={campaign} /> {/* Truyền campaign qua props */}
                                </div>
                                <div>
                                    <hr className="line-break-product-details" />
                                </div>
                                <div>
                                    <CampaignInformation campaign={campaign} /> {/* Truyền campaign qua props */}
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