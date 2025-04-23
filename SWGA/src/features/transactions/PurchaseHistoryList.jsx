import { Spin, Typography, Table, Tag } from "antd";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { usePurchaseHistories } from "./usePurchaseHistories";

const TableContainer = styled.div`
  margin-top: 20px;
`;

const StyledAmount = styled.div`
  font-weight: 600;
  color: #1a1a1a;
`;

function PurchaseHistoryList() {
    const { Title } = Typography;
    const {
        isLoading,
        purchaseHistories,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        setSort,
        error,
    } = usePurchaseHistories();

    const formatDate = (dateString) => {
        try {
            if (!dateString) return "-";
            return format(new Date(dateString), "dd/MM/yyyy HH:mm");
        } catch (err) {
            console.error("Invalid date:", dateString);
            return "Invalid date";
        }
    };

    const columns = [
        {
            title: "STT",
            key: "stt",
            align: "center",
            render: (text, record, index) => (page - 1) * limit + index + 1,
        },
        {
            title: "Mã hóa đơn",
            dataIndex: "id",
            key: "id",
            sorter: true,
            align: "center",
        },
        {
            title: "Thời gian",
            dataIndex: "createdDate",
            key: "createdDate",
            sorter: true,
            align: "center",
            render: formatDate,
        },
        {
            title: "Số điểm",
            dataIndex: "points",
            key: "points",
            sorter: true,
            align: "center",
            render: (points) => <span>{points}</span>,
        },
        {
            title: "Tổng tiền",
            dataIndex: "amount",
            key: "amount",
            sorter: true,
            align: "center",
            render: (amount) => (
                <StyledAmount>{amount.toLocaleString()}đ</StyledAmount>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            align: "center",
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
    if (error) return <Empty resourceName="lịch sử mua điểm" message={error.message} />;
    if (!purchaseHistories?.data?.length) return <Empty resourceName="lịch sử mua điểm" />;

    return (
        <TableContainer>
            <Table
                columns={columns}
                dataSource={purchaseHistories?.data}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: purchaseHistories?.totalCount,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 50], // Thêm tùy chọn 5 mục mỗi trang
                    showSizeChangerLabel: false,
                    formatPageText: () => "",
                    showSizeChanger: true, // Ẩn hoàn toàn phần chọn số lượng mục mỗi trang
                }}
                onChange={handleTableChange}
                rowKey="id"
            />
        </TableContainer>
    );
}

export default PurchaseHistoryList;