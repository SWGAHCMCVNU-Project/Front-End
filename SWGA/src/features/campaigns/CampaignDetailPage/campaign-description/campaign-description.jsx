import parse from "html-react-parser";
import { useParams } from "react-router-dom"; // Import useParams để lấy campaignId
import getCampaignByIdAPI from "../../../../hooks/campaign/useGetCampaignById";
import "./campaign-description.scss";

function CampaignDescription() {
    const { campaignId } = useParams(); // Lấy campaignId từ URL
    const { isLoading, data: campaign } = getCampaignByIdAPI(campaignId); // Truyền campaignId vào hook

    if (isLoading) return null; // Trả về null khi đang tải

    return (
        <div className="campaign-details-description">
            {parse(campaign.description)}
        </div>
    );
}

export default CampaignDescription;