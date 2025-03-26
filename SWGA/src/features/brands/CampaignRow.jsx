import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import styled from "styled-components";
import logoDefault from "../../assets/images/campaign.png";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { handleValidImageURL } from "../../utils/helpers";

const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
  margin-left: ${(props) => (props.$isNullImage ? "2rem" : "0")};
`;

const Img = styled.div`
  display: block;
  align-items: center;
  width: ${(props) => (props.src ? "50px" : "38px")};
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  margin-left: ${(props) => (props.src ? "2rem" : "0.5rem")};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StationName = styled.div`
  margin-left: ${(props) => (props.$isNullImage ? "0.5rem" : "0")};
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StackedTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
  font-size: 1.4rem;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
`;

const CostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
  font-size: 1.4rem;
`;

// Thêm style cho span để căn chỉnh nhãn và giá trị
const LabelValue = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Khoảng cách giữa nhãn và giá trị */
`;

const Label = styled.span`
  min-width: 70px; /* Đảm bảo nhãn có độ dài cố định để thẳng hàng */
  display: inline-block;
`;

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
  gap: 0.3rem;
`;

function CampaignRow({ campaign, displayedIndex }) {
  const {
    id: campaignId,
    image,
    dateCreated,
    openingHours,
    closingHours,
    phone,
    status,
    campaignName,
    email,
    state,
    totalIncome,
    totalSpending,
    greenWalletImage,
    coverPhoto,
    currentStateName,
    currentState,
    startOn,
    endOn,
  } = campaign;

  const statusToTagName = {
    Pending: "tag-orange",
    Active: "cyan",
    Inactive: "no",
    Rejected: "orange",
    Closed: "red",
    Cancelled: "error",
    Finished: "red",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  return (
    <Table.Row>
      <StationIndex>{displayedIndex}</StationIndex>
      <Station $isNullImage={image === null}>
        <Img src={isValidImage ? image || "" : logoDefault} />
        <StationName $isNullImage={image === null}>{campaignName}</StationName>
      </Station>

      <StackedTime>
        <LabelValue>
          <Label>Bắt đầu:</Label>
          <StackedTimeFrameAbove>
            {format(new Date(startOn), "dd MMM yyyy", { locale: vi })}
          </StackedTimeFrameAbove>
        </LabelValue>
        <LabelValue>
          <Label>Kết thúc:</Label>
          <StackedTimeFrameBelow>
            {format(new Date(endOn), "dd MMM yyyy", { locale: vi })}
          </StackedTimeFrameBelow>
        </LabelValue>
      </StackedTime>

      <CostContainer>
        <LabelValue>
          <Label>Lợi nhuận:</Label>
          <StackedTimeFrameAbove>{totalIncome}</StackedTimeFrameAbove>
        </LabelValue>
        <LabelValue>
          <Label>Chi tiêu:</Label>
          <StackedTimeFrameBelow>{totalSpending}</StackedTimeFrameBelow>
        </LabelValue>
      </CostContainer>

      <Tag type={statusToTagName[currentState]}>{currentStateName}</Tag>
    </Table.Row>
  );
}

export default CampaignRow;