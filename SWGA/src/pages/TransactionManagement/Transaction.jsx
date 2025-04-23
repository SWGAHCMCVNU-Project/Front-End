import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import SearchPurchaseHistory from "../../features/transactions/SearchPurchaseHistory"; // Cập nhật import
import PurchaseHistoryList from "../../features/transactions/PurchaseHistoryList"; // Cập nhật import
import { PurchaseHistoriesProvider } from "../../features/transactions/usePurchaseHistories"; // Cập nhật import

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function TransactionPage() {
    return (
        <PurchaseHistoriesProvider>
            <Container>
                <div className="title-table-list">
                    <Title level={2}>
                        Lịch sử mua điểm
                    </Title>
                    <div>
                        <SearchPurchaseHistory />
                    </div>
                </div>

                <div className="tabled">
                    <Row gutter={[24, 0]}>
                        <Col xs="24" xl={24}>
                            <Card
                                bordered={false}
                                className="criclebox tablespace mb-24"
                            >
                                <PurchaseHistoryList />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </PurchaseHistoriesProvider>
    );
}

export default TransactionPage;