import { useState } from "react";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import VoucherRow from "./VoucherRow";
import { useVouchers } from "../../hooks/voucher/useVouchers";
import VoucherSetRowsPerPage from "./VoucherSetRowsPerPage";
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
  const [pageSize, setPageSize] = useState(10);
  const { vouchers, isLoading } = useVouchers({ size: pageSize });

  if (isLoading) return <Spinner />;
  if (!vouchers?.result?.length) return <Empty resourceName="ưu đãi" />;

  return (
    <Menus>
      <Table columns="0.5fr 3fr 1fr 1fr">
        <Table.Header>
          <div>STT</div>
          <div>Tên voucher</div>
          <div>Trạng thái</div>
          <div>Hành động</div>
        </Table.Header>
        <Table.Body
          data={vouchers.result}
          render={(voucher, index) => (
            <VoucherRow
              key={voucher.id}
              voucher={voucher}
              displayedIndex={(vouchers.page - 1) * vouchers.size + index + 1}
            />
          )}
        />
        <Table.Footer>
          <Pagination
            count={vouchers.total}
            currentPage={vouchers.page}
            pageSize={vouchers.size}
            pageCount={vouchers.totalPages}
          />
          <VoucherSetRowsPerPage pageSize={pageSize} setPageSize={setPageSize} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default VoucherTable;