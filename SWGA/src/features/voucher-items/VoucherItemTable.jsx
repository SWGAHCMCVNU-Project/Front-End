import { useState } from "react";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import SetRowsPerPage from "./SetRowsPerPage";
import VoucherItemRow from "./VoucherItemRow";
import { useVoucherItems } from "./useVoucherItems";

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

function VoucherItemTable() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { voucherItemsByBrandId, isLoading } = useVoucherItems(
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
  if (!voucherItemsByBrandId?.result?.length)
    return <Empty resourceName="phiếu ưu đãi" />;

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <Menus>
      <Table columns="0.5fr 3.3fr 1.7fr 1.2fr 1fr">
        <Table.Header>
          <StyledHeader>STT</StyledHeader>
          <StackedHeader
            label="Tên phiếu ưu đãi"
            onClick={() => handleStackedClick("Id")}
            $ascending={sortField === "Id" && sortOrder === "asc"}
            $active={sortField === "Id"}
          />
          <div>Chi phí</div>
          <StyledHeader>Ngày tạo</StyledHeader>

          <StyledHeader>Hành động</StyledHeader>
        </Table.Header>

        <Table.Body
          data={voucherItemsByBrandId?.result}
          render={(voucher, index) => (
            <StyledButton>
              <VoucherItemRow
                key={voucher.id}
                voucher={voucher}
                index={index + 1}
                displayedIndex={
                  (voucherItemsByBrandId.currentPage - 1) *
                    voucherItemsByBrandId.pageSize +
                  index +
                  1
                }
              />
            </StyledButton>
          )}
        />
        <Table.Footer>
          <Pagination
            count={voucherItemsByBrandId?.rowCount}
            currentPage={currentPage}
            pageSize={voucherItemsByBrandId?.pageSize}
            pageCount={voucherItemsByBrandId?.pageCount}
            totalCount={voucherItemsByBrandId?.totalCount}
          />
          <SetRowsPerPage
            pageSize={voucherItemsByBrandId?.pageSize}
            onLimitChange={onLimitChange}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default VoucherItemTable;
