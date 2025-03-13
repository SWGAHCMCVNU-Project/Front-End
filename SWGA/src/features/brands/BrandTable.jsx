import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";
import BrandSetRowsPerPage from "./SetRowsPerPage";
import { useBrands } from "../../hooks/brand/useBrands";
import { toast } from "react-hot-toast";

function BrandTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(Number(searchParams.get("size")) || 10);
  const searchTerm = searchParams.get("searchName") || ""; 

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
    setPageSize(Number(searchParams.get("size")) || 10);
  }, [searchParams]);

  const { brands, isLoading, error } = useBrands({
    page: currentPage,
    size: pageSize,
    search: searchTerm,
    isAsc: true,
    state: true,
  });

  const brandData = brands?.data || {
    items: [],
    total: 0,
    page: currentPage,
    size: pageSize,
    totalPages: 1,
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= brandData.totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      setSearchParams(params, { replace: true });
    }
  };

  const handlePageSizeChange = (newSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", newSize.toString());
    params.set("page", "1");
    setSearchParams(params, { replace: true });
  };

  if (error) {
    toast.error("Có lỗi khi tải danh sách thương hiệu");
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      {!brandData.items.length ? (
        <Empty resourceName="thương hiệu" />
      ) : (
        <Menus>
          <Table columns="0.5fr 3.2fr 1.6fr 1.2fr 1.1fr 1.2fr">
            <Table.Header>
              <div>STT</div>
              <StackedHeader label="Tên thương hiệu" />
              <div>Thời gian làm việc</div>
              <div>Tổng chi phí</div>
              <div>Trạng thái</div>
              <div>Hành động</div>
            </Table.Header>

            <Table.Body
              data={brandData.items}
              render={(brand, index) => (
                <BrandRow
                  key={brand.id}
                  brand={brand}
                  displayedIndex={(brandData.page - 1) * brandData.size + index + 1}
                />
              )}
            />

            <Table.Footer>
              <Pagination count={brandData.total} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
              <BrandSetRowsPerPage pageSize={pageSize} setPageSize={handlePageSizeChange} />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </div>
  );
}

export default BrandTable;
