import { useState } from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Empty from "./Empty";
import OrderRow from "./OrderRow";
import SetRowsPerPage from "./SetRowsPerPage";
import { useOrdersByStudentId } from "./useOrdersByStudentId";

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

function OrdersByStudentId() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { ordersByStudentId, isLoading: ordersLoading } = useOrdersByStudentId(
    limit,
    sortField,
    sortOrder
  );

  const [currentPage, setCurrentPage] = useState(1);
  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  if (ordersLoading) return <Spinner />;
  if (!ordersByStudentId?.result?.length)
    return <Empty resourceName="đơn hàng" />;

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách đơn hàng</Heading>
          </HeadingGroup>
        </Row>
        <Menus>
          <Table columns="0.4fr 1.7fr 1.8fr 1.6fr 1.2fr 1.5fr">
            <Table.Header>
              <StyledHeader>STT</StyledHeader>
              <div>Tên sinh viên</div>
              <StyledHeader>Trạm nhận hàng</StyledHeader>
              <StyledHeader>Thời gian đặt hàng</StyledHeader>
              <StyledHeader>Tổng tiền</StyledHeader>

              <StyledHeader>Tình trạng</StyledHeader>
            </Table.Header>

            <Table.Body
              data={ordersByStudentId?.result}
              render={(order, index) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  index={index + 1}
                  displayedIndex={
                    (ordersByStudentId.currentPage - 1) *
                      ordersByStudentId.pageSize +
                    index +
                    1
                  }
                />
              )}
            />
            <Table.Footer>
              <Pagination
                count={ordersByStudentId?.rowCount}
                currentPage={currentPage}
                pageSize={ordersByStudentId?.pageSize}
                pageCount={ordersByStudentId?.pageCount}
                totalCount={ordersByStudentId?.totalCount}
              />
              <SetRowsPerPage
                pageSize={ordersByStudentId?.pageSize}
                onLimitChange={onLimitChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      </Container>
    </>
  );
}

export default OrdersByStudentId;
