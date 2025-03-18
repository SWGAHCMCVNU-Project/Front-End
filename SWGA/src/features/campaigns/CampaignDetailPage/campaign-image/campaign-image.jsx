import { Avatar } from "antd";
import imgDefaultCampaign from "../../../../assets/images/campaign.png";
import { useParams } from "react-router-dom"; // Import useParams để lấy campaignId
import { useImageValidity } from "../../../../utils/helpers";
import getCampaignByIdAPI from "../../../../hooks/campaign/useGetCampaignById";
import "./campaign-image.scss";

function CampaignImage() {
    const { campaignId } = useParams(); // Lấy campaignId từ URL
    const campaignDefaultImages = imgDefaultCampaign;
    const { isLoading, data: campaign } = getCampaignByIdAPI(campaignId); // Truyền campaignId vào hook
    const campaignImage = campaign && campaign.image;
    const isValidImages = useImageValidity(campaign, campaignImage);

    if (isLoading) return null; // Trả về null khi đang tải

    return (
        <div className="campaign-details-avatar">
            <Avatar.Group>
                <Avatar
                    className="campaign-details-avatar-img"
                    shape="square"
                    src={isValidImages.find((image) => true) ? campaignImage : campaignDefaultImages}
                />
            </Avatar.Group>
        </div>
    );
}

export default CampaignImage;