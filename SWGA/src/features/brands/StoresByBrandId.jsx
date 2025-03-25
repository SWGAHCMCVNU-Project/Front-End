import { useState } from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import Empty from "./Empty";
import SetRowsPerPage from "./SetRowsPerPage";
import StoreRow from "./StoreRow";
import { useStores } from "../../hooks/store/useStores"; // Thay thế useStoresByBrandId bằng useStores

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

function StoresByBrandId() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");

  // Gọi hook useStores với các tham số
  const { stores, isLoading: storesLoading, error } = useStores({
    page: currentPage,
    size: pageSize,
    sort: `${sortField}:${sortOrder}`,
  });

  // Debug: Log các giá trị để kiểm tra
  console.log("StoresByBrandId - currentPage:", currentPage);
  console.log("StoresByBrandId - pageSize:", pageSize);
  console.log("StoresByBrandId - sort:", `${sortField}:${sortOrder}`);
  console.log("StoresByBrandId - stores:", stores);
  console.log("StoresByBrandId - isLoading:", storesLoading);
  console.log("StoresByBrandId - error:", error);

  const onLimitChange = (newLimit) => {
    setPageSize(newLimit);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi số dòng mỗi trang
  };

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // Reset về trang đầu khi thay đổi sắp xếp
  };

  // Kiểm tra trạng thái loading
  if (storesLoading) {
    console.log("StoresByBrandId - Showing Spinner because storesLoading is true");
    return <Spinner />;
  }

  // Kiểm tra lỗi
  if (error) {
    console.log("StoresByBrandId - Error occurred:", error);
    return <div>Có lỗi xảy ra khi tải danh sách cửa hàng</div>;
  }

  // Kiểm tra dữ liệu rỗng
  if (!stores?.result?.length) {
    console.log("StoresByBrandId - No stores found. stores.result:", stores?.result);
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
              data={stores?.result}
              render={(store, index) => (
                <StyledButton>
                  <StoreRow
                    key={store.id}
                    store={store}
                    index={index + 1}
                    displayedIndex={
                      (stores.currentPage - 1) * stores.pageSize + index + 1
                    }
                  />
                </StyledButton>
              )}
            />
            <Table.Footer>
              <Pagination
                count={stores?.rowCount}
                currentPage={currentPage}
                pageSize={stores?.pageSize}
                pageCount={stores?.pageCount}
                totalCount={stores?.totalCount}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <SetRowsPerPage
                pageSize={stores?.pageSize}
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