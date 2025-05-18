import { Spin, Table } from "antd";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import { format } from "date-fns";
import { useCampTransactions } from "./useCampTransactions";

const TableContainer = styled.div`
  margin-top: 20px;
`;

const StyledAmount = styled.div`
  font-weight: 600;
  color: ${(props) => (props.amount >= 0 ? "#389e0d" : "#ff4d4f")};
`;

function CampTransactionList() {
  const {
    isLoading,
    campTransactions,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    setSort,
    error,
  } = useCampTransactions();

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
      title: "Chiến dịch",
      dataIndex: "campaignName",
      key: "campaignName",
      sorter: true,
      align: "center",
    },

    {
      title: "Số coin",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      align: "center",
      render: (amount) => (
        <StyledAmount amount={amount}>
          {typeof amount === "number" ? amount : "-"}
        </StyledAmount>
      ),
    },
    {
      title: "Tỷ lệ",
      dataIndex: "rate",
      key: "rate",
      align: "center",
      render: (rate) => (rate ? rate.toFixed(2) : "-"),
    },
    {
      title: "Thời gian",
      dataIndex: "dateCreated",
      key: "dateCreated",
      sorter: true,
      align: "center",
      render: formatDate,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
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
  if (error)
    return (
      <Empty
        resourceName="Lịch sử giao dịch hoạt động"
        message={error.message}
      />
    );
  if (!campTransactions?.data?.length)
    return <Empty resourceName="Lịch sử giao dịch hoạt động" />;

  return (
    <TableContainer>
      <Table
        columns={columns}
        dataSource={campTransactions?.data}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: campTransactions?.totalCount,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChangerLabel: false,
          formatPageText: () => "",
        }}
        onChange={handleTableChange}
        rowKey={(record) => `${record.campaignId}-${record.dateCreated}`}
      />
    </TableContainer>
  );
}

export default CampTransactionList;
