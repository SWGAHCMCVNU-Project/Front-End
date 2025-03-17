import parse from "html-react-parser";
import styled from "styled-components";
import greenBean from "../../../../assets/images/dauxanh.png";
import { useParams } from "react-router-dom";
import getCampaignByIdAPI from "../../../../hooks/campaign/useGetCampaignById";
import "./campaign-information.scss";

const Total = styled.span`
  color: #2ecc71;
  font-weight: 600;
  font-size: 17px;
  margin-left: 5px;
`;

function CampaignInformation() {
    const { campaignId } = useParams();
    const { isLoading, data: campaign } = getCampaignByIdAPI(campaignId);

    if (isLoading || !campaign) return null; // Trả về null nếu đang tải hoặc campaign không tồn tại

    return (
        <>
            <div className="campaign-details-condition">
                <label>Thể lệ chương trình: </label>
                <span>{parse(campaign.condition || "<p>Không có thể lệ</p>")}</span>
            </div>

            <div className="campaign-details-information">
                <div>
                    <label>Hạn mức: </label>
                    <span>
                        <Total>
                            {(campaign.totalCost || 0).toLocaleString("vi-VN")}
                            <img className="shape-avatar-campaign-bean" src={greenBean} />
                        </Total>
                    </span>
                </div>
                <span className="separator">|</span>
                <div>
                    <label>Đã chi: </label>
                    <span>
                        <Total>
                            {(campaign.usageCost || 0).toLocaleString("vi-VN")}
                            <img className="shape-avatar-campaign-bean" src={greenBean} />
                        </Total>
                    </span>
                </div>
            </div>
            <div className="campaign-details-participant-information">
                <label>Lượng mã ưu đãi đã sử dụng: </label>
                <span>{campaign.numberOfItemsUsed > 0 ? campaign.numberOfItemsUsed : 0}</span>
            </div>
        </>
    );
}

export default CampaignInformation;