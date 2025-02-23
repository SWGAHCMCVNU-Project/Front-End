import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi2";
import { Table, Spin } from "antd";
import { mockCustomers } from "./mockCustomers"; // Sẽ tạo file mock data sau

const FilterContainer = styled.div`
  margin: 20px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-grey-200);
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--color-green-400);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: var(--color-green-400);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-green-500);
  }
`;

function CustomerList() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Số voucher đã mua",
      dataIndex: "vouchersBought",
      key: "vouchersBought",
      sorter: true,
      render: (value) => value.toLocaleString(),
    },
    {
      title: "Số lần đến cửa hàng",
      dataIndex: "visitCount",
      key: "visitCount",
      sorter: true,
      render: (value) => value.toLocaleString(),
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "totalSpent",
      key: "totalSpent",
      sorter: true,
      render: (value) => `${value.toLocaleString()}đ`,
    }
  ];

  const handleRowClick = (record) => {
    navigate(`/customers/${record.id}`);
  };

  return (
    <FilterContainer>
      <Title>Danh sách khách hàng</Title>
      
      <TopSection>
        <SearchSection>
          <SearchInput 
            type="text" 
            placeholder="Tìm kiếm khách hàng..." 
          />
        </SearchSection>

        <AddButton>
          <HiPlus />
          <span>Thêm khách hàng mới</span>
        </AddButton>
      </TopSection>

      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={mockCustomers}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </Spin>
    </FilterContainer>
  );
}

export default CustomerList; 