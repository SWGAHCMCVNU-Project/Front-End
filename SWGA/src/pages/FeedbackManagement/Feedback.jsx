// FeedbackPage.jsx
import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import FeedbackFilter from "../../features/feedback/feedback-filter";
import FeedbackSearch from "../../features/feedback/feedback-search";
import { FeedbackProvider } from "../../features/feedback/useFeedback";

function FeedbackPage() {
  return (
    <FeedbackProvider>
      <div className="title-table-list">
        <Title className="title-name-table-list" level={2}>
          Danh sách phản hồi
        </Title>
        <FeedbackSearch />
      </div>

      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox tablespace mb-24">
              <FeedbackFilter />
            </Card>
          </Col>
        </Row>
      </div>
    </FeedbackProvider>
  );
}

export default FeedbackPage;
