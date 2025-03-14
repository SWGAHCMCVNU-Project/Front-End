import { useEffect, useState } from "react";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import VoucherTypeRow from "./VoucherTypeRow";
import SetRowsPerPage from "./SetRowsPerPage";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import { useVoucherTypes } from "../../hooks/voucher-type/useVoucherTypes";
import { toast } from "react-hot-toast";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function VoucherTypeTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lấy page và size trực tiếp từ searchParams
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const [sortOrder] = useState(true);

  const searchTerm = searchParams.get("search") || "";
  const debouncedSearch = useDebounced(searchTerm, 500);

  // Khi search thay đổi, reset về trang 1
  useEffect(() => {
    if (searchTerm !== debouncedSearch) {
      setSearchParams(
        new URLSearchParams({
          page: "1",
          size: pageSize.toString(),
          ...(debouncedSearch && { search: debouncedSearch }),
        }),
        { replace: true }
      );
    }
  }, [debouncedSearch, searchTerm, pageSize, setSearchParams]);

  const { voucherTypes, error, isLoading } = useVoucherTypes({
    page: currentPage,
    size: pageSize,
    search: debouncedSearch,
    isAsc: sortOrder,
    state: true,
  });

  const voucherTypeData = voucherTypes?.data || {
    items: [],
    total: 0,
    page: currentPage,
    size: pageSize,
    totalPages: 0,
  };

  // Nếu không có dữ liệu trên trang hiện tại và không phải trang 1, quay về trang trước
  useEffect(() => {
    if (voucherTypeData.items.length === 0 && currentPage > 1) {
      setSearchParams(
        new URLSearchParams({
          page: (currentPage - 1).toString(),
          size: pageSize.toString(),
          ...(debouncedSearch && { search: debouncedSearch }),
        }),
        { replace: true }
      );
    }
  }, [voucherTypeData.items, currentPage, pageSize, debouncedSearch, setSearchParams]);

  const handlePageChange = (newPage) => {
    const maxPage = Math.max(1, voucherTypeData.totalPages || 1);
    if (newPage > maxPage) return;
    setSearchParams(
      new URLSearchParams({
        page: newPage.toString(),
        size: pageSize.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
      }),
      { replace: true }
    );
  };

  const handlePageSizeChange = (newSize) => {
    setSearchParams(
      new URLSearchParams({
        size: newSize.toString(),
        page: "1", // Reset về trang 1 khi thay đổi pageSize
        ...(debouncedSearch && { search: debouncedSearch }),
      }),
      { replace: true }
    );
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Có lỗi khi tải danh sách loại ưu đãi");
    return null;
  }

  return (
    <TableContainer>
      {!voucherTypeData.items.length ? (
        <Empty resource="loại ưu đãi" />
      ) : (
        <Menus>
          <Table columns="0.5fr 3.2fr 2.5fr 1.6fr 1.2fr">
            <Table.Header>
              <div>STT</div>
              <div>Tên loại ưu đãi</div>
              <div>Mô tả</div>
              <div>Trạng thái</div>
              <div>Hành động</div>
            </Table.Header>

            <Table.Body
              data={voucherTypeData.items}
              render={(voucherType, index) => (
                <VoucherTypeRow
                  key={voucherType.id}
                  {...voucherType}
                  displayedIndex={(currentPage - 1) * pageSize + index + 1}
                />
              )}
            />

            <Table.Footer>
              <Pagination
                count={voucherTypeData.total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <SetRowsPerPage
                pageSize={pageSize}
                onLimitChange={handlePageSizeChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </TableContainer>
  );
}

export default VoucherTypeTable;