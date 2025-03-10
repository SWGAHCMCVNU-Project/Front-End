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

const Img = styled.img`
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

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
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
        <span>
          Bắt đầu:{" "}
          <StackedTimeFrameAbove>
            {format(new Date(startOn), "dd MMM yyyy", { locale: vi })}
          </StackedTimeFrameAbove>
        </span>
        <span>
          Kết thúc:{" "}
          <StackedTimeFrameBelow>
            {format(new Date(endOn), "dd MMM yyyy", { locale: vi })}
          </StackedTimeFrameBelow>
        </span>
      </StackedTime>

      <StackedTime>
        <span>
          Lợi nhuận:{" "}
          <StackedTimeFrameAbove>{totalIncome}</StackedTimeFrameAbove>
        </span>
        <span>
          Chi tiêu:{" "}
          <StackedTimeFrameBelow>{totalSpending}</StackedTimeFrameBelow>
        </span>
      </StackedTime>
      <Tag type={statusToTagName[currentState]}>{currentStateName}</Tag>
    </Table.Row>
  );
}

export default CampaignRow;
