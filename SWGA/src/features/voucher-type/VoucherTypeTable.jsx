import { useState, useEffect } from "react";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import VoucherTypeRow from "./VoucherTypeRow";
import SetRowsPerPage from "./SetRowsPerPage";
import { useSearchParams } from "react-router-dom";
import { useVoucherTypes } from "../../hooks/voucher-type/useVoucherTypes";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

function VoucherTypeTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Đảm bảo pageSize luôn là số hợp lệ
  const rawPageSize = searchParams.get("size");
  const pageSize = rawPageSize && !isNaN(Number(rawPageSize)) ? Number(rawPageSize) : 10;
  // Sử dụng state nội bộ để quản lý currentPage
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [sortOrder] = useState(true);
  const search = searchParams.get("search") || "";

  // Đồng bộ currentPage với searchParams khi searchParams thay đổi
  useEffect(() => {
    const pageFromParams = Number(searchParams.get("page")) || 1;
    console.log("Page from searchParams:", pageFromParams);
    setCurrentPage(pageFromParams);
  }, [searchParams]);

  const { voucherTypes, error, isLoading } = useVoucherTypes({
    page: currentPage,
    size: pageSize,
    search: search,
    isAsc: sortOrder,
    state: true,
  });

  const [voucherTypeData, setVoucherTypeData] = useState({
    items: [],
    total: 0,
    page: currentPage,
    size: pageSize,
    totalPages: 0,
  });

  // Cập nhật voucherTypeData khi voucherTypes thay đổi
  useEffect(() => {
    if (voucherTypes?.data) {
      setVoucherTypeData(voucherTypes.data);
    }
  }, [voucherTypes]);

  const handlePageChange = (newPage) => {
    console.log("Changing to page:", newPage);
    setCurrentPage(newPage);
    setSearchParams({
      page: newPage.toString(),
      size: pageSize.toString(),
      ...(search && { search: search }),
    });
  };

  const handlePageSizeChange = (newSize) => {
    console.log("Changing page size to:", newSize);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi pageSize
    setSearchParams({
      size: newSize.toString(),
      page: "1",
      ...(search && { search: search }),
    });
  };

  const handleVoucherTypeUpdate = (updatedVoucherType) => {
    setVoucherTypeData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === updatedVoucherType.id ? { ...item, ...updatedVoucherType } : item
      ),
    }));
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Có lỗi khi tải danh sách loại ưu đãi");
    return null;
  }
  if (!voucherTypes || !voucherTypeData) {
    return <Empty resource="loại ưu đãi" />;
  }

  const items = voucherTypeData.items || [];
  const totalCount = voucherTypeData.total || 0;
  const totalPages = voucherTypeData.totalPages || 0;

  console.log("Voucher types:", voucherTypes);
  console.log("Total count:", totalCount, "Total pages:", totalPages, "Current page:", currentPage, "Page size:", pageSize);

  return (
    <TableContainer>
      {!items.length ? (
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
              data={items}
              render={(voucherType, index) => (
                <VoucherTypeRow
                  key={voucherType.id}
                  {...voucherType}
                  displayedIndex={(currentPage - 1) * pageSize + index + 1}
                  onUpdate={handleVoucherTypeUpdate}
                />
              )}
            />

            <Table.Footer>
              <FooterContainer>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalCount}
                  onChange={handlePageChange}
                  showSizeChanger
                  onShowSizeChange={(current, size) => handlePageSizeChange(size)}
                />
                <SetRowsPerPage
                  pageSize={pageSize}
                  onLimitChange={handlePageSizeChange}
                />
              </FooterContainer>
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </TableContainer>
  );
}

export default VoucherTypeTable;