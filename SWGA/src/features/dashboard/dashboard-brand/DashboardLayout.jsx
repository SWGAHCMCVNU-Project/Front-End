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

  // Fetch wallet balance using TanStack Query
  const { data: walletBalance, isLoading: isLoadingWallet } = useQuery({
    queryKey: ['walletBalance'],
    queryFn: async () => {
      const walletData = await walletService.getWalletByBrandId();
      return walletData?.balance || 0;
    },
    staleTime: 5 * 60 * 1000, // Cache dữ liệu trong 5 phút
  });

  // Kiểm tra tất cả các trạng thái loading
  if (isLoadingStores || isLoadingVouchers || isLoadingCampaigns || isLoadingWallet) 
    return <Spinner />;

  const titles = {
    numberOfCampaigns: totalCampaigns || 0,
    numberOfStores: stores?.totalCount || 0,
    numberOfVoucherItems: totalVouchers || 0,
    balance: walletBalance, // Sử dụng walletBalance từ useQuery
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