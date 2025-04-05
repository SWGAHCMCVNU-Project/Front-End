import styled from "styled-components";
import Spinner from "../../../ui/Spinner";
import RightRanking from "./RightRanking";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import { useStores } from "../../../hooks/store/useStores";
import { useVouchers } from "../../../hooks/voucher/useVouchers";
import useGetAllCampaigns from "../../../hooks/campaign/useGetAllCampaigns";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { stores, isLoading: isLoadingStores } = useStores();
  const { totalVouchers, isLoading: isLoadingVouchers } = useVouchers();
  const { totalCampaigns, isLoading: isLoadingCampaigns } = useGetAllCampaigns();

  if (isLoadingStores || isLoadingVouchers || isLoadingCampaigns) return <Spinner />;

  const titles = {
    numberOfCampaigns: totalCampaigns || 0,
    numberOfStores: stores?.totalCount || 0,
    numberOfVoucherItems: totalVouchers || 0,
    balance: 0,
  };

  return (
    <StyledDashboardLayout>
      <Stats titles={titles} />
      <TodayActivity />
      <RightRanking />
      <SalesChart />
    </StyledDashboardLayout>
  );
}