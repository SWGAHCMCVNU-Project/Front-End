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

const CenteredRanking = styled.div`
  grid-column: 2 / span 2; /* Căn giữa bằng cách chiếm 2 cột ở giữa */
  display: flex;
  justify-content: center;
`;

const CenteredActivity = styled.div`
  grid-column: 2 / span 2; /* Căn giữa bằng cách chiếm 2 cột ở giữa */
  display: flex;
  justify-content: center;
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
      <CenteredActivity>
        <TodayActivity />
      </CenteredActivity>
      <CenteredRanking>
        <RightRanking />
      </CenteredRanking>
      <SalesChart />
    </StyledDashboardLayout>
  );
}