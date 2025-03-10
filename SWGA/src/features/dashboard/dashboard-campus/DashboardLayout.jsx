/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../../ui/Spinner";
import RightRanking from "./RightRanking";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import { useBeans } from "./useBeans";
import { useCampusStats } from "./useCampusState"; // Hook mới
import { useStudentRanking } from "./useStudentRanking";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { campusStats, isLoading: isLoadingStats } = useCampusStats(); // Hook mới
  const { beansCampus, isLoading: isLoadingBeans } = useBeans(); // Hook sửa đổi
  const { studentRankingCampus, isLoading: isLoadingRanking } = useStudentRanking(); // Hook sửa đổi

  if (isLoadingStats || isLoadingBeans || isLoadingRanking) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats titles={campusStats} />
      <TodayActivity />
      <RightRanking />
      <SalesChart beans={beansCampus} />
    </StyledDashboardLayout>
  );
}