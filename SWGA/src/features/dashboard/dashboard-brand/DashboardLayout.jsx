import styled from "styled-components";
import Spinner from "../../../ui/Spinner";
import RightRanking from "./RightRanking";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import { useStores } from "../../../hooks/store/useStores";
import { useVouchers } from "../../../hooks/voucher/useVouchers";
import useGetAllCampaigns from "../../../hooks/campaign/useGetAllCampaigns";
import walletService from '../../../store/api/walletApi';
import { useQuery } from '@tanstack/react-query';
import { useBrand } from '../../../hooks/brand/useBrand';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 2.4rem;
`;

const ActivityAndRankingContainer = styled.div`
  grid-column: 1 / -1; /* Span the full width of the grid (from first to last column) */
  display: flex;
  justify-content: space-between; /* Push children to the edges */
  gap: 4.8rem; /* Increase the gap between TodayActivity and RightRanking */
  width: 100%; /* Ensure the container takes the full width */
`;

const ActivityWrapper = styled.div`
  flex: 1; /* Allow the wrapper to grow and take available space */
  display: flex;
  justify-content: flex-start; /* Align to the left */
`;

const RankingWrapper = styled.div`
  flex: 1; /* Allow the wrapper to grow and take available space */
  display: flex;
  justify-content: flex-end; /* Align to the right */
`;

export default function DashboardLayout() {
  const { stores, isLoading: isLoadingStores } = useStores();
  const { totalVouchers, isLoading: isLoadingVouchers } = useVouchers();
  const { totalCampaigns, isLoading: isLoadingCampaigns } = useGetAllCampaigns();
  const { brand, isLoading: isLoadingBrand } = useBrand();

  const { data: walletBalance, isLoading: isLoadingWallet } = useQuery({
    queryKey: ['walletBalance', brand?.id],
    queryFn: async () => {
      if (!brand?.id) return 0;
      const walletData = await walletService.getWalletByBrandId(brand.id);
      return walletData?.balance || 0;
    },
    enabled: !!brand?.id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoadingStores || isLoadingVouchers || isLoadingCampaigns || isLoadingWallet || isLoadingBrand) 
    return <Spinner />;

  const titles = {
    numberOfCampaigns: totalCampaigns || 0,
    numberOfStores: stores?.totalCount || 0,
    numberOfVoucherItems: totalVouchers || 0,
    balance: walletBalance || 0,
  };

  return (
    <StyledDashboardLayout>
      <Stats titles={titles} />
      <ActivityAndRankingContainer>
        <ActivityWrapper>
          <TodayActivity />
        </ActivityWrapper>
        <RankingWrapper>
          <RightRanking />
        </RankingWrapper>
      </ActivityAndRankingContainer>
      <SalesChart />
    </StyledDashboardLayout>
  );
}