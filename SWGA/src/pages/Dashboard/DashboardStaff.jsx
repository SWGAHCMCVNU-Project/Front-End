/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from "styled-components";
import Row from "../../ui/Row";
import Sidenav from '../../components/layout/Sidenav';

const Container = styled.div`
  margin: 2rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Heading = styled.h1`
  margin-bottom: 0;
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  text-align: left;
  line-height: 1.4;
`;

const MainContent = styled.div`
  display: flex;
  min-height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 250px;
  background: white;
  border-right: 1px solid #f0f0f0;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

function DashboardStaff() {
  return (
    <MainContent>
      <SidebarContainer>
        <Sidenav color="#1890ff" />
      </SidebarContainer>
      <ContentContainer>
        <Container>
          <Row type="horizontal">
            <Heading as="h1">Thống kê tổng quan</Heading>
          </Row>
        </Container>
      </ContentContainer>
    </MainContent>
  );
}

export default DashboardStaff;
