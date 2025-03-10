import { useState, useEffect } from "react";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import VoucherRow from "./VoucherRow";
import { useVouchers } from "../../hooks/voucher/useVouchers";
import VoucherSetRowsPerPage from "./SetRowsPerPage";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
// import VoucherTableOperations from "./VoucherTableOperations";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function VoucherTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lấy các giá trị từ URL params hoặc dùng giá trị mặc định
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("size")) || 10
  );
  const [sortOrder] = useState(true);

  // Get search term from URL params
  const searchTerm = searchParams.get("search") || "";
  const debouncedSearch = useDebounced(searchTerm, 500);

  // Cập nhật state từ URL khi params thay đổi
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
    
    setCurrentPage(page);
    setPageSize(size);
  }, [searchParams]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const { vouchers, error } = useVouchers({
    page: currentPage,
    size: pageSize,
    search: debouncedSearch,
    isAsc: sortOrder,
    state: true
  });

  const voucherData = vouchers?.data || {
    items: [],
    total: 0,
    page: currentPage,
    size: pageSize
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params, { replace: true });
  };

  // Handle page size change
  const handlePageSizeChange = (newSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", newSize.toString());
    params.set("page", "1");
    setSearchParams(params, { replace: true });
  };

  if (error) {
    toast.error("Có lỗi khi tải danh sách phiếu ưu đãi");
  }

  return (
    <TableContainer>
      {/* <VoucherTableOperations /> */}

      {!voucherData.items.length ? (
        <Empty resource="phiếu ưu đãi" />
      ) : (
        <Menus>
          <Table columns="1fr 0.8fr 1fr 0.8fr 0.8fr 1fr 1fr 0.5fr">
            <Table.Header>
              <div>Tên Phiếu</div>
              <div>Hình Ảnh</div>
              <div>Loại Ưu Đãi</div>
              <div>Giá</div>
              <div>Tỉ Lệ</div>
              <div>Ngày Tạo</div>
              <div>Trạng Thái</div>
              <div></div>
            </Table.Header>

            <Table.Body 
              data={voucherData.items}
              render={(voucher) => (
                <VoucherRow 
                  key={voucher.id} 
                  voucher={voucher}
                />
              )}
            />

            <Table.Footer>
              <Pagination 
                count={voucherData.total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <VoucherSetRowsPerPage 
                pageSize={pageSize}
                setPageSize={handlePageSizeChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </TableContainer>
  );
}

export default VoucherTable;
