// LuckyPrizeTable.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import LuckyPrizeRow from "./LuckyPrizeRow";
import useGetLuckyPrizes from "../../hooks/lucky-prize/useGetLuckyPrizes";
import Spinner from "../../ui/Spinner";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$center ? "center" : "flex-start")};
  padding: 1.2rem 0.8rem;
  font-weight: 600;
`;

export default function LuckyPrizeTable({ setRefetch, setOnPrizeAdded }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 10;
  const currentPage = Number(searchParams.get("page")) || 1;

  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");

  const { prizes: initialPrizes, loading, error, refetch } = useGetLuckyPrizes({
    page: currentPage,
    size: limit,
    searchName: searchParams.get("search") || "",
    status: searchParams.get("status") === "true",
    isAsc: sortOrder === "asc",
  });

  const [prizes, setPrizes] = useState(initialPrizes);

  // Cập nhật prizes khi initialPrizes thay đổi (từ API)
  useEffect(() => {
    setPrizes(initialPrizes);
  }, [initialPrizes]);

  const handlePrizeAdded = (newPrize) => {
    // Trì hoãn 1.5 giây để hiển thị dữ liệu mới sau thông báo
    setTimeout(() => {
      setPrizes((prevPrizes) => [
        ...prevPrizes,
        { ...newPrize, id: newPrize.id || Date.now() }, // Đảm bảo có id
      ]);
    }, 1500); // 1.5 giây
  };

  // Chỉ gọi setRefetch và setOnPrizeAdded một lần khi component mount
  useEffect(() => {
    setRefetch(() => refetch);
    setOnPrizeAdded(() => handlePrizeAdded);
  }, []); // Dependency array rỗng để chỉ chạy một lần khi mount

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (!prizes?.length) return <Empty resourceName="giải thưởng" />;

  return (
    <Table columns="0.4fr 2fr 1fr 1fr 1fr 0.5fr">
      <Table.Header>
        <StyledHeaderCell $center>STT</StyledHeaderCell>
        <StyledHeaderCell>Tên giải thưởng</StyledHeaderCell>
        <StyledHeaderCell $center>Xác suất</StyledHeaderCell>
        <StyledHeaderCell $center>Số lượng</StyledHeaderCell>
        <StyledHeaderCell $center>Trạng thái</StyledHeaderCell>
        <StyledHeaderCell $center>Hành động</StyledHeaderCell>
      </Table.Header>
      <Table.Body
        data={prizes}
        render={(prize, index) => (
          <LuckyPrizeRow
            key={prize.id}
            prize={prize}
            displayedIndex={(currentPage - 1) * limit + index + 1}
            onSuccess={refetch} // Giữ refetch cho edit
          />
        )}
      />
      <Table.Footer>{/* Có thể thêm pagination nếu cần */}</Table.Footer>
    </Table>
  );
}