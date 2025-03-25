// components/CampusPage.js
import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import SearchCampus from "../../features/campus/CampusPage/search-campus";
import CampusFilter from "../../features/campus/CampusPage/campus-filter";
import CampusList from "../../features/campus/CampusPage/campus-list";
import { CampusProvider } from "../../features/campus/CampusPage/useCampuses";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

function CampusPage() {
  return (
    <CampusProvider>
      <Container>
        <Title level={2}>Danh sách các campus</Title>
        <HeaderWrapper>
          <CampusFilter />
          <SearchCampus />
        </HeaderWrapper>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card bordered={false} className="criclebox tablespace mb-24">
                <CampusList />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </CampusProvider>
  );
}

export default CampusPage;