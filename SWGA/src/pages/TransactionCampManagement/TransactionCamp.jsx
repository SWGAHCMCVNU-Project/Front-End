import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import SearchCampTransactions from "../../features/camp_transaction/SearchCampTransactions";
import CampTransactionList from "../../features/camp_transaction/CampTransactionList";
import { CampTransactionsProvider } from "../../features/camp_transaction/useCampTransactions";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function TransactionCamp() {
  return (
    <CampTransactionsProvider>
      <Container>
        <div className="title-table-list">
          <Title level={2}>Lịch sử giao dịch hoạt động</Title>
          <div>
            <SearchCampTransactions />
          </div>
        </div>

        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card bordered={false} className="cric gover-box tablespace mb-24">
                <CampTransactionList />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </CampTransactionsProvider>
  );
}

export default TransactionCamp;