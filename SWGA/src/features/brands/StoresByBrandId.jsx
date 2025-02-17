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
import { useStoresByBrandId } from "./useStoresByBrandId";

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
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { storesByBrandId, isLoading: storesLoading } = useStoresByBrandId(
    limit,
    sortField,
    sortOrder
  );

  const [currentPage, setCurrentPage] = useState(1);
  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  if (storesLoading) return <Spinner />;
  if (!storesByBrandId?.result?.length)
    return <Empty resourceName="cửa hàng" />;

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

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
              data={storesByBrandId?.result}
              render={(store, index) => (
                <StyledButton>
                  <StoreRow
                    key={store.id}
                    store={store}
                    index={index + 1}
                    displayedIndex={
                      (storesByBrandId.currentPage - 1) *
                        storesByBrandId.pageSize +
                      index +
                      1
                    }
                  />
                </StyledButton>
              )}
            />
            <Table.Footer>
              <Pagination
                count={storesByBrandId?.rowCount}
                currentPage={currentPage}
                pageSize={storesByBrandId?.pageSize}
                pageCount={storesByBrandId?.pageCount}
                totalCount={storesByBrandId?.totalCount}
              />
              <SetRowsPerPage
                pageSize={storesByBrandId?.pageSize}
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
