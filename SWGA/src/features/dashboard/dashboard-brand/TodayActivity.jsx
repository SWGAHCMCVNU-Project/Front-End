import styled, { css } from "styled-components";
import DataItemBrand from "./DataItemBrand";
import { useCampaignRankingByBrand } from "../../../hooks/campaign/useCampaignRankingByBrand";
import { useBrand } from "../../../hooks/brand/useBrand";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / -1;
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
  max-height: 300px;
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
  ${(props) =>
    props.as === "h3" &&
    css`
      padding-left: 4rem; /* Thêm padding để thẳng hàng với ngôi sao */
    `}
  color: #f9ad14;
  text-align: left;
  line-height: 1.4;
`;

const RankingContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  gap: 2rem;
`;

const RankingSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
`;

function TodayActivity() {
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const { data: campaignRanking, isLoading: isLoadingCampaignRanking, isError: isErrorCampaign } = useCampaignRankingByBrand(brand?.id);

  if (isLoadingBrand || isLoadingCampaignRanking) {
    return <NoActivity>Đang tải...</NoActivity>;
  }

  if (isErrorCampaign) {
    return <NoActivity>Có lỗi xảy ra khi tải dữ liệu xếp hạng chiến dịch</NoActivity>;
  }

  const sortedByVoucherUsage = campaignRanking
    ? [...campaignRanking]
        .sort((a, b) => b.voucherUsageRatio - a.voucherUsageRatio)
        .map((campaign, index) => ({
          ...campaign,
          rank: index + 1,
          name: campaign.campaignName,
          image: campaign.image,
          value: campaign.voucherUsageRatio * 100,
        }))
    : [];

  const sortedByVoucherBought = campaignRanking
    ? [...campaignRanking]
        .sort((a, b) => b.voucherBoughtRatio - a.voucherBoughtRatio)
        .map((campaign, index) => ({
          ...campaign,
          rank: index + 1,
          name: campaign.campaignName,
          image: campaign.image,
          value: campaign.voucherBoughtRatio * 100,
        }))
    : [];

  return (
    <StyledToday>
      <StyledHeading>
        <Heading as="h2">Bảng xếp hạng chiến dịch</Heading>
        <Heading as="h3">Số lượng: {campaignRanking?.length || 0}</Heading>
      </StyledHeading>

      <RankingContainer>
        <RankingSection>
          <Heading as="h3">Tỉ lệ sử dụng voucher</Heading>
          {sortedByVoucherUsage.length > 0 ? (
            <DataList>
              {sortedByVoucherUsage.map((activity) => (
                <DataItemBrand key={activity.id} activity={activity} />
              ))}
            </DataList>
          ) : (
            <NoActivity>Không có dữ liệu...</NoActivity>
          )}
        </RankingSection>

        <RankingSection>
          <Heading as="h3">Tỉ lệ mua voucher</Heading>
          {sortedByVoucherBought.length > 0 ? (
            <DataList>
              {sortedByVoucherBought.map((activity) => (
                <DataItemBrand key={activity.id} activity={activity} />
              ))}
            </DataList>
          ) : (
            <NoActivity>Không có dữ liệu...</NoActivity>
          )}
        </RankingSection>
      </RankingContainer>
    </StyledToday>
  );
}

export default TodayActivity;