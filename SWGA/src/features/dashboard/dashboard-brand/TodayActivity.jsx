import styled, { css } from "styled-components";
import DataItemBrand from "./DataItemBrand";
import { useCampaignRankingBrand } from "../../../hooks/ranking/useCampaignRankingBrand";
import { useBrand } from "../../../hooks/brand/useBrand";

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
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const { data: campaignRanking, isLoading: isLoadingCampaignRanking, isError: isErrorCampaign } = useCampaignRankingBrand(brand?.id);

  // Kiểm tra trạng thái loading
  if (isLoadingBrand || isLoadingCampaignRanking) {
    return <NoActivity>Đang tải...</NoActivity>;
  }

  // Kiểm tra lỗi
  if (isErrorCampaign) {
    return <NoActivity>Có lỗi xảy ra khi tải dữ liệu xếp hạng chiến dịch</NoActivity>;
  }

  return (
    <StyledToday>
      <StyledHeading>
        <Heading as="h2">Bảng xếp hạng chiến dịch</Heading>
        <Heading as="h3">Số lượng: {campaignRanking?.length || 0}</Heading>
      </StyledHeading>
      {campaignRanking?.length > 0 ? (
        <DataList>
          {campaignRanking.map((activity) => (
            <DataItemBrand key={activity.rank} activity={activity} />
          ))}
        </DataList>
      ) : (
        <NoActivity>Không có dữ liệu chiến dịch...</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;