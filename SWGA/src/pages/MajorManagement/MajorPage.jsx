import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import MajorFilter from "../../features/majors/MajorPage/major-filter";
import MajorList from "../../features/majors/MajorPage/major-list";
import SearchMajor from "../../features/majors/MajorPage/major-search";
import { MajorProvider } from "../../features/majors/MajorPage/useMajors";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function MajorPage() {
    return (
        <MajorProvider>
            <Container>
                <Title level={2}>
                    Danh sách các chuyên ngành
                </Title>
                <div className="title-table-list">
                    <div>
                        <MajorFilter />
                    </div>
                    <div>
                        <SearchMajor />
                    </div>
                </div>

                <div className="tabled">
                    <Row gutter={[24, 0]}>
                        <Col xs="24" xl={24}>
                            <Card
                                bordered={false}
                                className="criclebox tablespace mb-24"
                            >
                                <MajorList />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </MajorProvider>
    );
};

export default MajorPage;