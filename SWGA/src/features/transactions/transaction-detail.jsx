import { Card, Descriptions, Tag, Divider, Typography } from "antd";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { mockTransactions } from "./mockTransactions";

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

const TransactionDetail = () => {
    const { id } = useParams();
    const transaction = mockTransactions.find(t => t.id === id);

    if (!transaction) {
        return <div>Không tìm thấy hóa đơn</div>;
    }

    return (
        <Container>
            <Title level={2}>Chi tiết hóa đơn {transaction.id}</Title>
            
            <StyledCard title="Thông tin chung">
                <Descriptions column={2}>
                    <Descriptions.Item label="Mã hóa đơn">
                        <span style={{ fontWeight: 600 }}>{transaction.id}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        <Tag color={transaction.status === "completed" ? "#389e0d" : "#1677ff"} style={{ fontWeight: 500 }}>
                            {transaction.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian">
                        {format(new Date(transaction.transactionDate), "dd/MM/yyyy HH:mm")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Cửa hàng">
                        {transaction.storeName}
                    </Descriptions.Item>
                </Descriptions>
            </StyledCard>

            <StyledCard title="Chi tiết thanh toán">
                <Descriptions column={1}>
                    <Descriptions.Item label="Tổng tiền hàng">
                        <AmountText>{transaction.amount.toLocaleString()}đ</AmountText>
                    </Descriptions.Item>
                    {transaction.paymentMethods.voucher && (
                        <>
                            <Descriptions.Item label="Voucher giảm giá">
                                <Tag color="#1677ff" style={{ fontWeight: 500 }}>
                                    {transaction.voucherCode} ({transaction.voucherPercent}%)
                                </Tag>
                                <AmountText style={{ marginLeft: 8, color: '#ff4d4f' }}>
                                    -{transaction.paymentMethods.voucherAmount?.toLocaleString()}đ
                                </AmountText>
                            </Descriptions.Item>
                        </>
                    )}
                    <Descriptions.Item label="Thanh toán tiền mặt">
                        <AmountText>{transaction.paymentMethods.cashAmount?.toLocaleString()}đ</AmountText>
                    </Descriptions.Item>
                    <Divider />
                    <Descriptions.Item label="Tổng thanh toán">
                        <AmountText style={{ fontSize: 18, color: '#389e0d' }}>
                            {transaction.amount.toLocaleString()}đ
                        </AmountText>
                    </Descriptions.Item>
                </Descriptions>
            </StyledCard>

            <StyledCard title="Thông tin khách hàng">
                <Descriptions column={2}>
                    <Descriptions.Item label="Tên khách hàng">
                        {transaction.customer.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {transaction.customer.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {transaction.customer.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Điểm tích lũy">
                        <Tag color="#722ed1" style={{ fontWeight: 500 }}>{transaction.customer.points} điểm</Tag>
                    </Descriptions.Item>
                </Descriptions>
            </StyledCard>

            <StyledCard title="Danh sách sản phẩm">
                <Descriptions column={1}>
                    {transaction.items.map((item, index) => (
                        <Descriptions.Item key={index} label={item.name}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{item.quantity} x {item.price.toLocaleString()}đ</span>
                                <AmountText>{item.total.toLocaleString()}đ</AmountText>
                            </div>
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            </StyledCard>
        </Container>
    );
};

export default TransactionDetail; 