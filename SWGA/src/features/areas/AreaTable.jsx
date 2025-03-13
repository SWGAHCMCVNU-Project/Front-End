import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import SetRowsPerPage from "./SetRowsPerPage";
import StackedHeader from "../../ui/StackedHeader";
import { useAreas } from "../../hooks/areas/useAreas"; // Thay đổi đường dẫn import
import AreaRow from "./AreaRow";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

export default function AreaTable() {
  const [limit, setLimit] = useState(10); // Mặc định size là 10
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // Gọi useAreas với các tham số
  const { isLoading, areas, error } = useAreas({
    page: currentPage,
    size: limit,
    search: searchParams.get("search") || "",
    state: searchParams.get("state") === "true" ? true : false,
    isAsc: sortOrder === "asc",
  });

  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi limit
  };

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  if (isLoading) return <Spinner />;
  if (!areas?.result?.length) return <Empty resourceName="khu vực" />;

  const filteredCategories = filterCategoriesByState(
    areas.result,
    searchParams.get("state")
  );

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
        data={filteredCategories}
        render={(area, index) => (
          <StyledButton>
            <AreaRow
              area={area}
              key={area.id}
              index={index + 1}
              displayedIndex={
                (areas.currentPage - 1) * areas.pageSize + index + 1
              }
            />
          </StyledButton>
        )}
      />
      <Table.Footer>
        <Pagination
          count={areas?.totalCount} // Sử dụng totalCount
          currentPage={currentPage}
          pageSize={areas?.pageSize}
          pageCount={areas?.pageCount}
          totalCount={areas?.totalCount}
          onPageChange={(page) => setCurrentPage(page)} // Thêm sự kiện thay đổi trang
        />
        <SetRowsPerPage
          pageSize={areas?.pageSize}
          onLimitChange={onLimitChange}
        />
      </Table.Footer>
    </Table>
  );
}

function filterCategoriesByState(categories, filterValue) {
  if (!filterValue || filterValue === "all") {
    return categories;
  }

  const filteredStations = categories.filter((category) => {
    return category.state === (filterValue === "true");
  });

  return filteredStations;
}