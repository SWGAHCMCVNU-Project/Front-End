import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


import styled from "styled-components";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import Empty from "./Empty";
import BrandSetRowsPerPage from "./SetRowsPerPage";
import StoreRow from "./StoreRow";
import useStoresByBrandId from "../../hooks/store/useStoresByBrandId";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Container = styled.div`
  margin: 2rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

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

function StoresByBrandId({ brandId }) {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(Number(searchParams.get("size")) || 10); // Khởi tạo 
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");


  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;
    const urlSize = Number(searchParams.get('size')) || 10;
    
    if (urlPage !== currentPage) setCurrentPage(urlPage);
    if (urlSize !== pageSize) setPageSize(urlSize);
  }, [searchParams]);


  const { stores, loading: storesLoading, error, pagination, refetch } = useStoresByBrandId(
    brandId,
    {
      page: currentPage,
      size: pageSize,
      searchName: "",
    }
  );


  const onLimitChange = (newLimit) => {
    setPageSize(newLimit);
    setCurrentPage(1);  // Reset về trang đầu tiên
    refetch({ size: newLimit, page: 1 });  // Gọi API với tham số mới
  };


  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
    refetch({ sort: `${clickedColumn}:${sortOrder === "asc" ? "desc" : "asc"}`, page: 1 });
  };

  if (storesLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Có lỗi xảy ra khi tải danh sách cửa hàng: {error}</div>;
  }

  if (!Array.isArray(stores) || stores.length === 0) {
    return <Empty resourceName="cửa hàng" />;
  }

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách cửa hàng</Heading>
          </HeadingGroup>
        </Row>
        <Menus>
          <Table columns="0.5fr 2.5fr 1.7fr 1.7fr 1.2fr 1.1fr">
            <Table.Header>
              <StyledHeader>STT</StyledHeader>
              <StackedHeader
                label="Tên cửa hàng"
                onClick={() => handleStackedClick("StoreName")}
                ascending={sortField === "StoreName" && sortOrder === "asc"}
                active={sortField === "StoreName"}
              />
              <div>Địa chỉ</div>
              <div>Liên hệ</div>
              <div>Thời gian làm việc</div>
              <StyledHeader>Trạng thái</StyledHeader>
            </Table.Header>

            <Table.Body
              data={stores}
              render={(store, index) => (
                <StyledButton>
                  <StoreRow
                    key={store.id}
                    store={store}
                    index={index + 1}
                    displayedIndex={
                      (pagination.currentPage - 1) * pageSize + index + 1
                    }
                  />
                </StyledButton>
              )}
            />
            <Table.Footer>
              <Pagination
                count={pagination.totalItems}
                currentPage={pagination.currentPage}
                pageSize={pageSize}
                pageCount={pagination.totalPages}
                totalCount={pagination.totalItems}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  refetch({ page });
                }}
              />
              <BrandSetRowsPerPage
                pageSize={pageSize}
                onLimitChange={onLimitChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      </Container>
    </>
  );
}

export default StoresByBrandId;