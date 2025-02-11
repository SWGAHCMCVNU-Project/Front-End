import { useState } from "react";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";
import SetRowsPerPage from "./SetRowsPerPage";
import { useBrands } from "./useBrands";

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

function BrandTable() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { brands, isLoading } = useBrands(limit, sortField, sortOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  if (isLoading) return <Spinner />;
  if (!brands?.result?.length) return <Empty resourceName="thương hiệu" />;

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <Menus>
      <Table columns="0.5fr 3.2fr 1.6fr 1.2fr 1.1fr 1.2fr">
        <Table.Header>
          <StyledHeader>STT</StyledHeader>
          <StackedHeader
            label="Tên thương hiệu"
            onClick={() => handleStackedClick("BrandName")}
            ascending={sortField === "BrandName" && sortOrder === "asc"}
            active={sortField === "BrandName"}
          />
          <div>Thời gian làm việc</div>
          <div>Tổng chi phí</div>

          <StyledHeader>Trạng thái</StyledHeader>
          <StyledHeader>Hành động</StyledHeader>
        </Table.Header>

        <Table.Body
          data={brands?.result}
          render={(brand, index) => (
            <StyledButton>
              <BrandRow
                key={brand.id}
                brand={brand}
                index={index + 1}
                displayedIndex={
                  (brands.currentPage - 1) * brands.pageSize + index + 1
                }
              />
            </StyledButton>
          )}
        />
        <Table.Footer>
          <Pagination
            count={brands?.rowCount}
            currentPage={currentPage}
            pageSize={brands?.pageSize}
            pageCount={brands?.pageCount}
            totalCount={brands?.totalCount}
          />
          <SetRowsPerPage
            pageSize={brands?.pageSize}
            onLimitChange={onLimitChange}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BrandTable;
