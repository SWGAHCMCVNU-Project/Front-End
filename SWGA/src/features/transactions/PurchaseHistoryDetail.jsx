import { Card, Descriptions, Tag, Typography } from "antd";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useGetPurchaseHistory } from "../../hooks/buy-point/useGetPurchaseHistory";
import Empty from "../../ui/Empty";

const { Title } = Typography;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
  }
`;

const AmountText = styled.span`
  font-weight: 600;
  color: #1a1a1a;
  font-size: 16px;
`;

const PurchaseHistoryDetail = () => {
    const { id } = useParams();
    const { data: history, isLoading, error } = useGetPurchaseHistory({ id });

    if (isLoading) return <div>Đang tải...</div>;
    if (error) return <Empty resourceName="chi tiết hóa đơn" message={error.message} />;
    if (!history) return <Empty resourceName="chi tiết hóa đơn" />;

    return (
        <Container>
            <Title level={2}>Chi tiết hóa đơn {history.id}</Title>

            <StyledCard title="Thông tin chung">
                <Descriptions column={2}>
                    <Descriptions.Item label="Mã hóa đơn">
                        <span style={{ fontWeight: 600 }}>{history.id}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        <Tag color={history.paymentStatus === "completed" ? "#389e0d" : "#1677ff"} style={{ fontWeight: 500 }}>
                            {history.paymentStatus === "completed" ? "Hoàn thành" : "Đang xử lý"}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian">
                        {format(new Date(history.createdDate), "dd/MM/yyyy HH:mm")}
                    </Descriptions.Item>
                </Descriptions>
            </StyledCard>

            <StyledCard title="Chi tiết thanh toán">
                <Descriptions column={1}>
                    <Descriptions.Item label="Số điểm">
                        <AmountText>{history.points}</AmountText>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        <AmountText style={{ fontSize: 18, color: '#389e0d' }}>
                            {history.amount.toLocaleString()}đ
                        </AmountText>
                    </Descriptions.Item>
                </Descriptions>
            </StyledCard>
        </Container>
    );
};

export default PurchaseHistoryDetail;