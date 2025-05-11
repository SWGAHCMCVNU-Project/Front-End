import { Card, Steps } from "antd";
import Title from "antd/lib/typography/Title";
import { useContext, useEffect } from "react";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import CampaignBasicInformation from "./campaign-basic-infor";
import CampaignMSC from "./campaign-msc";
import CampaignTimeOfEvent from "./CampaignTimeOfEvent";
import CampaignVoucherCost from "./campaign-voucher-cost";
import CampaignReview from "./campaign-review";
import "./scss/campaign.scss";

function CampaignStep() {
  const moveBack = useMoveBack();
  const { current, setCurrent, completedSteps, setCompletedSteps } =
    useContext(NextPrevContext);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const steps = [
    {
      title: "Thông tin cơ bản",
      content: <CampaignBasicInformation />,
    },
    {
      title: "Nơi tổ chức chiến dịch",
      content: <CampaignMSC />,
    },
    {
      title: "Loại và thời gian diễn ra",
      content: <CampaignTimeOfEvent />,
    },
    {
      title: "Khuyến mãi",
      content: <CampaignVoucherCost />,
    },
    {
      title: "Xác nhận thông tin",
      content: <CampaignReview />,
    },
  ];

  const items = steps.map((item, index) => ({
    key: item.title,
    title: item.title,
    status: completedSteps.includes(index)
      ? "finish"
      : index === current
      ? "process"
      : "wait",
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