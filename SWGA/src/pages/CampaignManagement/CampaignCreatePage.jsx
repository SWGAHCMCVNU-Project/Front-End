import { NextPrevProvider } from "../../context/NextPrevContext";
import CampaignStep from "../../features/campaigns/CampaignCreatePage/campaign-step";

function CampaignCreatePage() {
    return (
        <NextPrevProvider>
            <CampaignStep />
        </NextPrevProvider>
    );
};

export default CampaignCreatePage;