import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import SearchTransaction from "../../features/transactions/search-transaction";
import TransactionList from "../../features/transactions/transaction-list";
import { BrandTransactionProvider } from "../../features/transactions/useBrandTransaction";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function BrandTransactionPage() {
    return (
        <BrandTransactionProvider>
            <Container>
                <div className="title-table-list">
                    <Title level={2}>
                        Lịch sử giao dịch
                    </Title>
                    <div>
                        <SearchTransaction />
                    </div>
                </div>

                <div className="tabled">
                    <Row gutter={[24, 0]}>
                        <Col xs="24" xl={24}>
                            <Card
                                bordered={false}
                                className="criclebox tablespace mb-24"
                            >
                                <TransactionList />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </BrandTransactionProvider>
    );
};

export default BrandTransactionPage;