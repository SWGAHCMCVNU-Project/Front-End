import styled from "styled-components";
import Spinner from "../../../ui/Spinner";
import RightRanking from "./RightRanking";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import { useBeans } from "./useBeans";
import { useDataColumnChart } from "./useDataColumnChart";
import { useTitles } from "./useTitles";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { titlesBrand, isLoading: isLoadingTitle } = useTitles();
  const { beansBrand, isLoading: isLoadingBeans } = useBeans();
  const { dataColumnChartBrand, isLoading: isLoadingData } =
    useDataColumnChart();

  if (isLoadingTitle || isLoadingBeans || isLoadingData) return <Spinner />;

  return (
    <>
      <StyledDashboardLayout>
        <Stats titles={titlesBrand} />
        <TodayActivity />
        <RightRanking />
        <SalesChart beans={beansBrand} />
      </StyledDashboardLayout>
    </>
  );
}
