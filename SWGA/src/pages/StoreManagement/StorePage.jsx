// StorePage.jsx
import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import StoreFilter from "../../features/stores/store-filter";
import StoreSearch from "../../features/stores/store-search";
import { StoreProvider } from "../../features/stores/useStore"; // Import named export StoreProvider

function StorePage() {
  return (
    <StoreProvider>
      <div className="title-table-list">
        <Title className="title-name-table-list" level={2}>
          Danh sách cửa hàng
        </Title>
        <StoreSearch />
      </div>

      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox tablespace mb-24">
              <StoreFilter />
            </Card>
          </Col>
        </Row>
      </div>
    </StoreProvider>
  );
}

export default StorePage;