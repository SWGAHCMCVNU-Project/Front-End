import styled, { css } from "styled-components";
import DataItemBrand from "./DataItemBrand";
import { useCampaignRankingByBrand } from "../../../hooks/campaign/useCampaignRankingByBrand";
import { useBrand } from "../../../hooks/brand/useBrand";
import { useState } from "react";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-width: 300px;
  padding-top: 2.4rem;
  min-height: 300px;
  width: 100%;

  @media (max-width: 1024px) {
    min-height: 250px;
  }

  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

const DataList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  flex: 1;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-500);
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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const TabButton = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: ${(props) =>
    props.active ? "#f9ad14" : "var(--color-grey-100)"};
  color: ${(props) => (props.active ? "white" : "var(--color-grey-700)")};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.active ? "#e89c00" : "var(--color-grey-200)"};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
  }
`;

function TodayActivity() {
  const { brand, isLoading: isLoadingBrand } = useBrand();
  const {
    data: campaignRanking,
    isLoading: isLoadingCampaignRanking,
    isError: isErrorCampaign,
  } = useCampaignRankingByBrand(brand?.id);

  const [rankingType, setRankingType] = useState("voucherUsageRatio");

  if (isLoadingBrand || isLoadingCampaignRanking) {
    return <NoActivity>Đang tải...</NoActivity>;
  }

  if (isErrorCampaign) {
    return (
      <NoActivity>Có lỗi xảy ra khi tải dữ liệu xếp hạng chiến dịch</NoActivity>
    );
  }

  const sortedCampaigns = campaignRanking
    ? [...campaignRanking]
        .sort((a, b) => {
          if (rankingType === "voucherUsageRatio") {
            return b.voucherUsageRatio - a.voucherUsageRatio;
          } else {
            return b.voucherBoughtRatio - a.voucherBoughtRatio;
          }
        })
        .slice(0, 5)
        .map((campaign, index) => ({
          ...campaign,
          rank: index + 1,
          name: campaign.campaignName,
          image: campaign.image,
          value:
            rankingType === "voucherUsageRatio"
              ? campaign.voucherUsageRatio * 100
              : campaign.voucherBoughtRatio * 100,
        }))
    : [];

  return (
    <StyledToday>
      <StyledHeading>
        <Heading as="h2">Bảng xếp hạng chiến dịch</Heading>
        <Heading as="h3">Số lượng: {sortedCampaigns?.length || 0}</Heading>
      </StyledHeading>
      <TabContainer>
        <TabButton
          active={rankingType === "voucherUsageRatio"}
          onClick={() => setRankingType("voucherUsageRatio")}
        >
          Tỉ lệ sử dụng voucher
        </TabButton>
        <TabButton
          active={rankingType === "voucherBoughtRatio"}
          onClick={() => setRankingType("voucherBoughtRatio")}
        >
          Tỉ lệ mua voucher
        </TabButton>
      </TabContainer>
      {sortedCampaigns?.length > 0 ? (
        <DataList>
          {sortedCampaigns.map((activity) => (
            <DataItemBrand key={activity.id} activity={activity} />
          ))}
        </DataList>
      ) : (
        <NoActivity>Không có dữ liệu chiến dịch...</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;