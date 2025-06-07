/* eslint-disable no-unused-vars */
import styled from "styled-components";
import RightRanking from "./RightRanking";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
const StyledDashboardLayouts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 2.4rem;
`;
export default function DashboardLayout() {
  // Fake data for campus stats
  const fakeCampusStats = {
    numberOfStudents: 10,
    numberOfLecturers: 3,
    numberOfPointPackages: 2,
  };

  // Fake data for beans (used in SalesChart)
  

  return (
     <>
    <StyledDashboardLayouts>
      <Stats titles={fakeCampusStats} />
    </StyledDashboardLayouts>
    <StyledDashboardLayout>
      <TodayActivity />
      <RightRanking />
      {/* <SalesChart beans={fakeBeansCampus} /> */}
    </StyledDashboardLayout>
  </>
  );
}