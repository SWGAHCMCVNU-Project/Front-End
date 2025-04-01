import styled, { css } from "styled-components";
import DataItemBrand from "../DataItemBrand";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const DataList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const StyledHeading = styled.div`
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4;
`;

const Heading = styled.h1`
  margin-bottom: 0;
  font-size: 1.9rem;
  font-weight: 550;
  ${(props) =>
    props.as === "h2" &&
    css`
      text-transform: uppercase;
    `}
  ${(props) => props.as === "h3" && css``}
  color: #f9ad14;
  text-align: left;
  line-height: 1.4;
`;

function TodayActivity() {
  // Fake campaign ranking data with proper structure for DataItemBrand
  const fakeCampaignRanking = [
    { id: 1, rank: 1, name: "Chiến dịch mùa hè", image: "", value: 450 },
    { id: 2, rank: 2, name: "Chiến dịch học tập", image: "", value: 380 },
    { id: 3, rank: 3, name: "Chiến dịch từ thiện", image: "", value: 320 },
    { id: 4, rank: 4, name: "Chiến dịch xanh", image: "", value: 280 },
  ];

  return (
    <StyledToday>
      <StyledHeading>
        <Heading as="h2">Bảng xếp hạng chiến dịch</Heading>
        <Heading as="h3">Số lượng: {fakeCampaignRanking.length}</Heading>
      </StyledHeading>
      {fakeCampaignRanking.length > 0 ? (
        <DataList>
          {fakeCampaignRanking.map((activity) => (
            <DataItemBrand key={activity.id} activity={activity} />
          ))}
        </DataList>
      ) : (
        <NoActivity>Không có dữ liệu...</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;