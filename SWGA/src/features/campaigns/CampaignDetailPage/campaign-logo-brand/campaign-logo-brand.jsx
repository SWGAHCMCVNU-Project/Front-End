import { Avatar, Tag, Typography } from "antd";
import imgDefaultBrand from "../../../../assets/images/brand.png";
import Spinner from "../../../../ui/Spinner";
import { useParams } from "react-router-dom";
import { formatDateCampaign, useImageValidity } from "../../../../utils/helpers";
import getCampaignByIdAPI from "../../../../hooks/campaign/useGetCampaignById";
import "./campaign-logo-brand.scss";

function CampaignLogoBrand() {
    const { Title } = Typography;
    const { campaignId } = useParams();
    const { isLoading, data } = getCampaignByIdAPI(campaignId); // Nhận toàn bộ data từ API
    const logoDefaultImages = imgDefaultBrand;

    if (isLoading) return <Spinner />;

    // Kiểm tra và lấy campaign đúng với campaignId từ items
    const campaign = data?.items
        ? data.items.find((item) => item.id === campaignId) || data.items[0] // Fallback lấy item đầu tiên nếu không tìm thấy
        : data;

  

    if (!campaign) return <div>Không tìm thấy campaign</div>; // Xử lý khi không có dữ liệu

    const logoImage =   imgDefaultBrand; // Sử dụng image từ JSON
    const isValidImages = useImageValidity(campaign, logoImage);

    const getStatusTagColor = (stateCurrent) => {
        switch (stateCurrent) {
            case 1: return "orange";
            case 2: return "purple";
            case 3: return "cyan";
            case 4: return "default";
            case 5: return "volcano";
            case 6: return "red";
            case 7: return "error";
            default: return "default-color";
        }
    };

    return (
        <>
            <div className="campaign-details-brand">
                <Avatar.Group>
                    <Avatar
                        className="campaign-details-brand-logo"
                        shape="square"
                        src={isValidImages.find((image) => true) ? logoImage : logoDefaultImages}
                    />
                </Avatar.Group>
                <Title className="campaign-details-title" level={3}>
                    {campaign.campaignName || "Chưa có tên"}
                </Title>
                
            </div>
            <div className="campaign-details-brand-information">
                <div>
                    <label>Thương hiệu tổ chức </label>
                    <span>{campaign.brandName || "Không có"}</span>
                </div>
                <span className="separator">|</span>
                <div>
                    <label>Thể loại </label>
                    <span>{campaign.typeName || "Không có"}</span>
                </div>
            </div>
            <div className="campaign-details-brand-information">
                <div>
                    <label>Diễn ra: </label>
                    <span>
                        {formatDateCampaign(campaign.startOn || "")} - {formatDateCampaign(campaign.endOn || "")}
                    </span>
                </div>
            </div>
            {campaign.link && campaign.link !== "null" ? (
                <div className="link-web">
                    <label>Website: </label>
                    <span>
                        <a className="website-span" href={campaign.link} target="_blank">
                            {campaign.link}
                        </a>
                    </span>
                </div>
            ) : null}
        </>
    );
}

export default CampaignLogoBrand;