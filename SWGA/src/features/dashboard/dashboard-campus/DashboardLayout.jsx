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

export default function DashboardLayout() {
  // Fake data for campus stats
  const fakeCampusStats = {
    numberOfStudents: 1200,
    numberOfLecturers: 80,
    numberOfInitiatives: 15,
    numberOfPointPackages: 5,
  };

  // Fake data for beans (used in SalesChart)
  const fakeBeansCampus = [
    { date: "2025-03-01", purchased: 5000, used: 3000 },
    { date: "2025-03-02", purchased: 6000, used: 4500 },
    { date: "2025-03-03", purchased: 7000, used: 2500 },
    { date: "2025-03-04", purchased: 5500, used: 6000 },
    { date: "2025-03-05", purchased: 8000, used: 4000 },
    { date: "2025-03-06", purchased: 6500, used: 5500 },
    { date: "2025-03-07", purchased: 9000, used: 3500 },
  ];

  return (
    <StyledDashboardLayout>
      <Stats titles={fakeCampusStats} />
      <TodayActivity />
      <RightRanking />
      <SalesChart beans={fakeBeansCampus} />
    </StyledDashboardLayout>
  );
}