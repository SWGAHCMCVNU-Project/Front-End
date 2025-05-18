import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import SetRowsPerPage from "./SetRowsPerPage";
import StackedHeader from "../../ui/StackedHeader";
import { useAreas } from "../../hooks/areas/useAreas";
import AreaRow from "./AreaRow";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AreaTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lấy limit và page từ URL, nếu không có thì mặc định
  const limit = Number(searchParams.get("limit")) || 10;
  const currentPage = Number(searchParams.get("page")) || 1;

  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");

  // Gọi API với các tham số từ URL
  const { isLoading, areas, error } = useAreas({
    page: currentPage,
    size: limit,
    searchName: searchParams.get("search") || "",
    state: searchParams.get("state") === "true",
    isAsc: sortOrder === "asc",
  });

  // Cập nhật URL khi limit thay đổi
  const onLimitChange = (newLimit) => {
    searchParams.set("limit", newLimit);
    searchParams.set("page", 1);  // Reset về trang 1 khi đổi limit
    setSearchParams(searchParams);
  };

  // Cập nhật URL khi đổi trang
  const onPageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  if (!areas?.result?.length) return <Empty resourceName="khu vực" />;

  return (
    <Table columns="0.4fr 2.1fr 1.9fr 1fr 1.3fr 1fr">
      <Table.Header>
        <StyledHeader>STT</StyledHeader>
        <StackedHeader
          label="Khu vực"
          onClick={() => handleStackedClick("AreaName")}
          ascending={sortField === "AreaName" && sortOrder === "asc"}
          active={sortField === "AreaName"}
        />
        <div>Mô tả</div>
        <StackedHeader
          label="Ngày tạo"
          onClick={() => handleStackedClick("DateCreated")}
          ascending={sortField === "DateCreated" && sortOrder === "asc"}
          active={sortField === "DateCreated"}
        />
        <StyledHeader>Trạng thái</StyledHeader>
        <StyledHeader>Hành động</StyledHeader>
      </Table.Header>

      <Table.Body
        data={areas.result}
        render={(area, index) => (
          <AreaRow
            key={area.id}
            area={area}
            displayedIndex={(currentPage - 1) * limit + index + 1}
          />
        )}
      />
      <Table.Footer>
        <Pagination
          count={areas.totalCount}
          currentPage={currentPage}
          pageSize={limit}
          pageCount={areas.pageCount}
          totalCount={areas.totalCount}
          onPageChange={onPageChange}
        />
        <SetRowsPerPage pageSize={limit} onLimitChange={onLimitChange} />
      </Table.Footer>
    </Table>
  );
}