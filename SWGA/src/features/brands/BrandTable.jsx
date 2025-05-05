import { useState, useEffect } from "react";
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
import styled from "styled-components";

// Đảm bảo căn giữa tất cả các cột
Table.Row = styled(Table.Row)`
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center; /* Căn giữa tất cả các cột */
    white-space: normal; /* Cho phép xuống dòng */
  }
`;

function BrandTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState("brandName"); // Default sort by brandName
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

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

  useEffect(() => {
    if (!isLoading && !error && brandData.items.length === 0 && currentPage > 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      setSearchParams(params);
      refetch();
    }
  }, [brandData.items, currentPage, isLoading, error, searchParams, setSearchParams, refetch]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    refetch();
  };

  const handlePageSizeChange = (newSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", newSize.toString());
    params.set("page", "1");
    setSearchParams(params);
    refetch();
  };

  const handleSortClick = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const isDataEmpty = !brandData.items.length || brandData.total === 0;

  if (error) {
    toast.error("Có lỗi khi tải danh sách thương hiệu");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Sort the brand items
  const sortedBrands = [...brandData.items].sort((a, b) => {
    let valueA, valueB;

    switch (sortField) {
      case "brandName":
        valueA = a.brandName?.toLowerCase() || "";
        valueB = b.brandName?.toLowerCase() || "";
        break;
      case "openingHours":
        valueA = a.openingHours || "";
        valueB = b.openingHours || "";
        break;
      case "totalSpending":
        valueA = Number(a.totalSpending) || 0;
        valueB = Number(b.totalSpending) || 0;
        break;
      default:
        return 0;
    }

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return (
    <div className="flex flex-col gap-8">
      {!brandData.items.length ? (
        <Empty resourceName="thương hiệu" />
      ) : (
        <Menus>
          <Table columns="0.5fr 2.5fr 1.5fr 1.5fr 1fr 0.5fr">
            <Table.Header>
              <div>STT</div>
              <StackedHeader
                label="Tên thương hiệu"
                onClick={() => handleSortClick("brandName")}
                ascending={sortField === "brandName" && sortOrder === "asc"}
                active={sortField === "brandName"}
              />
              <StackedHeader
                label="Thời gian làm việc"
                onClick={() => handleSortClick("openingHours")}
                ascending={sortField === "openingHours" && sortOrder === "asc"}
                active={sortField === "openingHours"}
              />
              <StackedHeader
                label="Tổng chi phí"
                onClick={() => handleSortClick("totalSpending")}
                ascending={sortField === "totalSpending" && sortOrder === "asc"}
                active={sortField === "totalSpending"}
              />
              <div>Trạng thái</div>
              <div></div> {/* Cột trống cho StyledAction */}
            </Table.Header>

            <Table.Body
              data={sortedBrands}
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
                currentPage={brandData.page}
                onPageChange={handlePageChange}
                disabled={isDataEmpty}
              />
              <BrandSetRowsPerPage
                pageSize={pageSize}
                setPageSize={handlePageSizeChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </div>
  );
}

export default BrandTable;