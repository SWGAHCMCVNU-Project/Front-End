// DashboardLayout.js
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../../ui/Spinner";
import RightRanking from "./RightRanking";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import PackageActivity from "./PackageActivity";
import { useBrands } from "../../../hooks/brand/useBrands";
import useGetAllCampaignsAdmin from "../../../hooks/campaign/useGetAllCampaignsAdmin";
import useGetAllCampuses from "../../../hooks/campus/useGetAllCampuses";
import useGetAllStudents from "../../../hooks/student/useGetAllStudents";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { totalBrands, isLoading: isLoadingBrands } = useBrands();
  const { 
    totalCampaigns, 
    isLoading: isLoadingCampaigns 
  } = useGetAllCampaignsAdmin();
  const { 
    totalCampuses, 
    isLoading: isLoadingCampuses 
  } = useGetAllCampuses();
  const { 
    totalCount: totalStudents, 
    isLoading: isLoadingStudents 
  } = useGetAllStudents();

  const titlesAdmin = {
    numberOfBrands: totalBrands || 0,
    numberOfCampaigns: totalCampaigns || 0,
    numberOfStudents: totalStudents || 0,
    numberOfCampuses: totalCampuses || 0
  };

  if (isLoadingBrands || isLoadingCampaigns || isLoadingCampuses || 
      isLoadingStudents) 
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats titles={titlesAdmin} />
      <PackageActivity />
      <RightRanking />
      <SalesChart />
    </StyledDashboardLayout>
  );
}