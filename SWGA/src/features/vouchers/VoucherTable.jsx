import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import SetRowsPerPage from "./SetRowsPerPage";
import VoucherRow from "./VoucherRow";
import { useVouchers } from "./useVouchers";

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

function VoucherTable() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { vouchersByBrandId, isLoading } = useVouchers(
    limit,
    sortField,
    sortOrder
  );
  const [currentPage, setCurrentPage] = useState(1);
  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  if (isLoading) return <Spinner />;
  if (!vouchersByBrandId?.result?.length)
    return <Empty resourceName="ưu đãi" />;

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
            label="Tên voucher"
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
          data={vouchersByBrandId?.result}
          render={(voucher, index) => (
            <StyledButton>
              <VoucherRow
                key={voucher.id}
                voucher={voucher}
                index={index + 1}
                displayedIndex={
                  (vouchersByBrandId.currentPage - 1) *
                    vouchersByBrandId.pageSize +
                  index +
                  1
                }
              />
            </StyledButton>
          )}
        />
        <Table.Footer>
          <Pagination
            count={vouchersByBrandId?.rowCount}
            currentPage={currentPage}
            pageSize={vouchersByBrandId?.pageSize}
            pageCount={vouchersByBrandId?.pageCount}
            totalCount={vouchersByBrandId?.totalCount}
          />
          <SetRowsPerPage
            pageSize={vouchersByBrandId?.pageSize}
            onLimitChange={onLimitChange}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default VoucherTable;
