import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import VoucherItemSetRowsPerPage from "./SetRowsPerPage";
import VoucherItemRow from "./VoucherItemRow";
import { useVoucherItems } from "../../hooks/voucher-item/useVoucherItems";

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
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get values from URL or use defaults
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const size = !searchParams.get("size") ? 10 : Number(searchParams.get("size"));
  const search = searchParams.get("search") || "";
  const state = searchParams.get("state") === null ? null : searchParams.get("state") === "true";
  const isAsc = searchParams.get("isAsc") === "true";

  const { voucherItems, isLoading } = useVoucherItems({
    page,
    size,
    search,
    state,
    isAsc
  });

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  const handleSizeChange = (newSize) => {
    searchParams.set("size", newSize);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleSortChange = () => {
    searchParams.set("isAsc", (!isAsc).toString());
    setSearchParams(searchParams);
  };

  if (isLoading) return <Spinner />;
  if (!voucherItems?.items?.length) return <Empty resourceName="phiếu ưu đãi" />;

  return (
    <Menus>
      <Table columns="0.5fr 3.3fr 1.7fr 1.2fr 1fr">
        <Table.Header>
          <StyledHeader>STT</StyledHeader>
          <StackedHeader
            label="Tên phiếu ưu đãi"
            onClick={handleSortChange}
            $ascending={isAsc}
            $active={true}
          />
          <div>Chi phí</div>
          <StyledHeader>Ngày tạo</StyledHeader>
          <StyledHeader>Hành động</StyledHeader>
        </Table.Header>

        <Table.Body
          data={voucherItems.items}
          render={(voucher, index) => (
            <StyledButton>
              <VoucherItemRow
                key={voucher.id}
                voucher={voucher}
                displayedIndex={(voucherItems.page - 1) * voucherItems.size + index + 1}
              />
            </StyledButton>
          )}
        />

        <Table.Footer>
          <Pagination
            count={voucherItems.total}
            currentPage={voucherItems.page}
            pageSize={voucherItems.size}
            totalPages={voucherItems.totalPages}
            onPageChange={handlePageChange}
          />
          <VoucherItemSetRowsPerPage
            pageSize={voucherItems.size}
            onLimitChange={handleSizeChange}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default VoucherItemTable;
