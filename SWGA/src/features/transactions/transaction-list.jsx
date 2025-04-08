import { Spin, Typography, Table, Tag } from "antd";
import styled from "styled-components";
import Empty from "../..//ui/Empty";
import greenBean from "../../assets/images/dauxanh.png";
import { TableItem } from "../../ui/custom/Table/TableItem";
import { formatCurrency } from "../../utils/helpers";
import { useBrandTransaction } from "./useBrandTransaction.jsx";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const StyledAmount = styled.div`
  font-weight: 600;
  color: #1a1a1a;
`;

const PaymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PaymentAmount = styled.span`
  font-weight: 500;
  color: #1a1a1a;
`;

function TransactionList() {
    const { Title } = Typography;
    const {
        isLoading,
        transactionBrand,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        setSort
    } = useBrandTransaction();


    const formatDate = (timestamp) => {
        try {
            if (!timestamp) return "-";
            return format(new Date(timestamp), "dd/MM/yyyy HH:mm");
        } catch (error) {
            console.error("Invalid date:", timestamp);
            return "Invalid date";
        }
    };

    const columns = [
        {
            title: "Mã hóa đơn",
            dataIndex: "id",
            key: "id",
            sorter: true,
            render: (id) => (
                <Link to={`/transactions/${id}`}>
                    <span style={{ fontWeight: 600, color: '#1677ff' }}>{id}</span>
                </Link>
            )
        },
        {
            title: "Cửa hàng",
            dataIndex: "storeName",
            key: "storeName",
            sorter: true,
            render: (name) => <span style={{ fontWeight: 500, color: '#1a1a1a' }}>{name}</span>
        },
        {
            title: "Thời gian",
            dataIndex: "transactionDate",
            key: "transactionDate",
            sorter: true,
            render: formatDate,
        },
        {
            title: "Tổng tiền",
            dataIndex: "amount",
            key: "amount",
            sorter: true,
            render: (amount) => (
                <StyledAmount>{amount.toLocaleString()}đ</StyledAmount>
            ),
        },
        {
            title: "Phương thức thanh toán",
            key: "paymentMethods",
            render: (_, record) => (
                <PaymentDetail>
                    {record.paymentMethods.voucher && (
                        <PaymentMethod>
                            <Tag color="#1677ff" style={{ fontWeight: 500 }}>Voucher {record.voucherPercent}%</Tag>
                        </PaymentMethod>
                    )}
                    {record.paymentMethods.cash && (
                        <PaymentMethod>
                            <Tag color="#52c41a" style={{ fontWeight: 500 }}>Tiền mặt</Tag>
                        </PaymentMethod>
                    )}
                </PaymentDetail>
            ),
        },
        {
            title: "Mã voucher",
            dataIndex: "voucherCode",
            key: "voucherCode",
            render: (code) => code ? (
                <span style={{ fontWeight: 500, color: '#1677ff' }}>{code}</span>
            ) : "-",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "completed" ? "#389e0d" : "#1677ff"} style={{ fontWeight: 500 }}>
                    {status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                </Tag>
            ),
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field) {
            setSort(`${sorter.field},${sorter.order === "ascend" ? "asc" : "desc"}`);
        }
        handlePageChange(pagination.current);
        handleLimitChange(pagination.pageSize);
    };

    if (isLoading) return <Spin />;
    if (!transactionBrand?.data?.length) return <Empty resourceName="giao dịch" />;

    const data = transactionBrand?.data?.map((transaction, index) => {
        const dataIndex = (page - 1) * limit + index + 1;

        return {
            key: transaction.id,
            number: (
                <>
                    <div className="number-header">
                        <span>{dataIndex}</span>
                    </div>
                </>
            ),
            Name: (
                <>
                    <div className="avatar-info">
                        <Title className="title-transaction-name" level={5}>{transaction.name}</Title>
                    </div>
                </>
            ),
            Type: (
                <>
                    <div className="ant-employed-table-align">
                        <span>{transaction.typeName}</span>
                    </div>
                </>
            ),
            Amount: (
                <>
                    <Stacked>
                        <StyleGreenWallet>
                            {formatCurrency(transaction.amount)}{" "}
                            <StyledImageBean src={greenBean} alt="dau xanh" />
                        </StyleGreenWallet>
                    </Stacked>
                </>
            ),
            Rate: (
                <>
                    <Stacked>{transaction.rate}</Stacked>
                </>
            ),
            DateCreated: (
                <>
                    <div className="ant-employed-table-align">
                        <span>{formatDate(transaction.dateCreated)}</span>
                    </div>
                </>
            )
        }
    });

    return (
        <TableContainer>
            <Table
                columns={columns}
                dataSource={transactionBrand?.data}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: transactionBrand?.totalCount,
                    showSizeChanger: true,
                }}
                onChange={handleTableChange}
                rowKey="id"
            />
        </TableContainer>
    );
}

export default TransactionList;

