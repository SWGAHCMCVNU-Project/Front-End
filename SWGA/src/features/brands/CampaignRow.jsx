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
  color: #1c5d78;
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

const LabelValue = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.span`
  min-width: 70px;
  display: inline-block;
`;

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #1c5d78;
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
    status = 0, // Giá trị mặc định nếu status không tồn tại
    campaignName,
    email,
    state,
    totalIncome,
    totalSpending,
    greenWalletImage,
    coverPhoto,
    startOn,
    endOn,
  } = campaign;

  const statusToTagName = {
    0: "no", // Không hoạt động
    1: "cyan", // Hoạt động
    2: "tag-orange", // Chờ duyệt
    3: "orange", // Từ chối
  };

  const statusToDisplayName = {
    0: "Không hoạt động",
    1: "Hoạt động",
    2: "Chờ duyệt",
    3: "Từ chối",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  // Log để kiểm tra giá trị của status
  console.log("Campaign ID:", campaignId, "Status:", status);

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
        {/* <LabelValue>
          <Label>Lợi nhuận:</Label>
          <StackedTimeFrameAbove>{totalIncome}</StackedTimeFrameAbove>
        </LabelValue> */}
        <LabelValue>
          <Label>Chi tiêu:</Label>
          <StackedTimeFrameBelow>{totalSpending}</StackedTimeFrameBelow>
        </LabelValue>
      </CostContainer>

      <Tag type={statusToTagName[status] || "no"}>{statusToDisplayName[status] || "Không xác định"}</Tag>
    </Table.Row>
  );
}

export default CampaignRow;