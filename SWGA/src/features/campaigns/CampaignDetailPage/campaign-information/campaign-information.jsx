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
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

const CoinImage = styled.img`
  height: 1em; // Sử dụng đơn vị em để đồng nhất với kích thước font
  vertical-align: middle;
`;

function CampaignInformation() {
    const { campaignId } = useParams();
    const { isLoading, data: campaign } = getCampaignByIdAPI(campaignId);

    if (isLoading || !campaign) return null;

    return (
        <>
            <div className="campaign-details-condition">
                <label>Thể lệ chương trình: </label>
                <span>{parse(campaign.condition || "<p>Không có thể lệ</p>")}</span>
            </div>

            <div className="campaign-details-information">
                <div>
                    <label>Hạn mức: </label>
                    <Total>
                        {(campaign.totalIncome || 0).toLocaleString("vi-VN")}
                        <CoinImage src={greenBean} alt="bean" />
                    </Total>
                </div>
                <span className="separator">|</span>
                <div>
                    <label>Đã chi: </label>
                    <Total>
                        {(campaign.totalSpending || 0).toLocaleString("vi-VN")}
                        <CoinImage src={greenBean} alt="bean" />
                    </Total>
                </div>
            </div>
            {/* <div className="campaign-details-participant-information">
                <label>Lượng mã ưu đãi đã sử dụng: </label>
                <span>{campaign.numberOfItemsUsed > 0 ? campaign.numberOfItemsUsed : 0}</span>
            </div> */}
        </>
    );
}

export default CampaignInformation;