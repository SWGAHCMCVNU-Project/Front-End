import Title from "antd/lib/typography/Title";
import CampaignFormUpdate from "../../features/campaigns/CampaignUpdatePage/campaign-form-update";


function CampaignUpdatePage() {
    return (
        <>
            <div className="title-table-list">
                <Title className="title-name-table-list" level={2}>
                    Cập nhật chiến dịch
                </Title>
            </div>
            <div>
                <CampaignFormUpdate />
            </div>
        </>
    );
};

export default CampaignUpdatePage;