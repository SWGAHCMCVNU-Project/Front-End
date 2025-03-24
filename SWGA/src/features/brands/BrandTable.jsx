import { useState } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams(); // Thêm setSearchParams
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const searchTerm = searchParams.get("searchName") || "";


  const { brands, isLoading, error, refetch } = useBrands({
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
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    refetch(); // Thêm refetch để đảm bảo dữ liệu được làm mới
  };

  const handlePageSizeChange = (newSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", newSize.toString());
    params.set("page", "1");
    setSearchParams(params);
    refetch(); // Thêm refetch
  };

  if (error) {
    toast.error("Có lỗi khi tải danh sách thương hiệu");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Brand Data after fetch:", brandData); // Debug dữ liệu trả về

  return (
    <div className="flex flex-col gap-8">
      {!brandData.items.length ? (
        <Empty resourceName="thương hiệu" />
      ) : (
        <Menus>
          <Table columns="0.6fr 2fr 1.5fr 0.5fr 1.4fr 1fr">
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
              <Pagination
                count={brandData.total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <BrandSetRowsPerPage pageSize={pageSize} setPageSize={handlePageSizeChange} />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </div>
  );
}

export default BrandTable;