import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Spin, Tag } from "antd";
import { HiMiniUserCircle, HiPhone, HiEnvelope, HiTicket, HiShoppingBag, HiGift } from "react-icons/hi2";
import styled from "styled-components";
import { mockCustomers } from "./mockCustomers";

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  & svg {
    width: 20px;
    height: 20px;
    color: var(--color-grey-500);
  }
`;

function CustomerTable() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 80,
      render: (_, __, index) => (
        <IconWrapper>
          <span>{index + 1}</span>
        </IconWrapper>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text) => (
        <IconWrapper>
          <HiMiniUserCircle />
          <span>{text}</span>
        </IconWrapper>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
      render: (text) => (
        <IconWrapper>
          <HiPhone />
          <span>{text}</span>
        </IconWrapper>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text) => (
        <IconWrapper>
          <HiEnvelope />
          <span>{text}</span>
        </IconWrapper>
      ),
    },
    {
      title: "Voucher đã sử dụng",
      dataIndex: "vouchersUsed",
      key: "vouchersUsed",
      sorter: true,
      render: (value) => (
        <IconWrapper>
          <HiTicket />
          <span>{value.toLocaleString()} voucher</span>
        </IconWrapper>
      ),
    },
    {
      title: "Số lần mua hàng",
      dataIndex: "visitCount",
      key: "visitCount",
      sorter: true,
      render: (value) => (
        <IconWrapper>
          <HiShoppingBag />
          <span>{value.toLocaleString()} lần</span>
        </IconWrapper>
      ),
    },
    {
      title: "Điểm tích lũy",
      dataIndex: "points",
      key: "points",
      sorter: true,
      render: (value) => (
        <IconWrapper>
          <HiGift />
          <span>{value.toLocaleString()} điểm</span>
        </IconWrapper>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = 
          status === "frequent" ? "green" : 
          status === "occasional" ? "blue" : 
          "orange";
        let text = 
          status === "frequent" ? "Thường xuyên" : 
          status === "occasional" ? "Thỉnh thoảng" : 
          "Hiếm khi";
        return <Tag color={color}>{text}</Tag>;
      },
    }
  ];

  const handleRowClick = (record) => {
    navigate(`/customers/${record.id}`);
  };

  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={mockCustomers}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' }
        })}
      />
    </Spin>
  );
}

export default CustomerTable; 