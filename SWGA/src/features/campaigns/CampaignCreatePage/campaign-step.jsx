import { Card, Steps } from "antd";
import Title from "antd/lib/typography/Title";
import { useContext, useEffect } from "react";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import CampaignBasicInformation from "./campaign-basic-infor";
import CampaignMSC from "./campaign-msc";
import CampaignReview from "./campaign-review";
import CampaignVoucherCost from "./campaign-voucher-cost";
import "./scss/campaign-step.scss";

function CampaignStep() {
    const moveBack = useMoveBack();
    const { current, setCurrent } = useContext(NextPrevContext);
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Hiển thị thông báo xác nhận gửi lại biểu mẫu
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        //Hủy đăng ký sự kiện khi component bị hủy
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const steps = [
        {
            title: 'Thông tin cơ bản',
            content: <CampaignBasicInformation />
        },
        {
            title: 'Nơi tổ chức chiến dịch',
            content: <CampaignMSC />
        },
        {
            title: 'Khuyến mãi',
            content: <CampaignVoucherCost />
        },
        {
            title: 'Xác nhận thông tin',
            content: <CampaignReview />
        }
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <>
            <div className="title-table-list">
                <Title className="title-name-table-list" level={2}>
                    Thêm chiến dịch mới
                </Title>
            </div>
            <div>
                <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
            </div>

            <div>
                <Card className="card-step">
                    <Steps current={current} items={items} />
                </Card>

                {steps[current].content}
            </div>

        </>
    );
}

export default CampaignStep;