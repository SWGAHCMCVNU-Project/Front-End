import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
// import Pagination from "../../ui/Pagination";
// import SetRowsPerPage from "./SetRowsPerPage";
import StackedHeader from "../../ui/StackedHeader";
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
export default function LuckyPrizeTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 10;
  const currentPage = Number(searchParams.get("page")) || 1;

  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");

  // Sử dụng hook luckyPrize thay vì areas
  const { prizes, loading, error, refetch } = useGetLuckyPrizes({
    page: currentPage,
    size: limit,
    searchName: searchParams.get("search") || "",
    status: searchParams.get("status") === "true",
    isAsc: sortOrder === "asc",
  });

  const onLimitChange = (newLimit) => {
    searchParams.set("limit", newLimit);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const onPageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

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
            index={index + 1}
            displayedIndex={(currentPage - 1) * limit + index + 1}
            onSuccess={refetch} // Thêm dòng này
          />
        )}
      />
      <Table.Footer>
        {/* <Pagination
          count={prizes.totalCount || 0}
          currentPage={currentPage}
          pageSize={limit}
          onPageChange={onPageChange}
        />
        <SetRowsPerPage pageSize={limit} onLimitChange={onLimitChange} /> */}
      </Table.Footer>
    </Table>
  );
}
