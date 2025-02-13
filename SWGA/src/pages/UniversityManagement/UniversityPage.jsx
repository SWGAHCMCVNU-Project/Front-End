import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import SearchUniversity from "../../features/universities/UniversityPage/search-university";
import UniversityFilter from "../../features/universities/UniversityPage/university-filter";
import UniversityList from "../../features/universities/UniversityPage/university-list";
import { UniversityProvider } from "../../features/universities/UniversityPage/useUniversities";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function UniversityPage() {
    return (
        <UniversityProvider>
            <Container>
                <Title level={2}>
                    Danh sách các trường đại học
                </Title>
                <div className="title-table-list">
                    <div>
                        <UniversityFilter />
                    </div>
                    <div>
                        <SearchUniversity />
                    </div>
                </div>

                <div className="tabled">
                    <Row gutter={[24, 0]}>
                        <Col xs="24" xl={24}>
                            <Card
                                bordered={false}
                                className="criclebox tablespace mb-24"
                            >
                                <UniversityList />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </UniversityProvider>
    );
};

export default UniversityPage;