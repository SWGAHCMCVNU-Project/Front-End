import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import Empty from "./Empty";
import HistoryRow from "./HistoryRow";
import SetRowsPerPage from "./SetRowsPerPage";
import { useHistoriesByBrandId } from "./useHistoriesByBrandId";

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

function HistoriesByBrandId() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { historiesByBrandId, isLoading: campaignsLoading } =
    useHistoriesByBrandId(limit, sortField, sortOrder);

  const [currentPage, setCurrentPage] = useState(1);
  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  if (campaignsLoading) return <Spinner />;
  if (!historiesByBrandId?.result?.length)
    return <Empty resourceName="lịch sử" />;

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách lịch sử giao dịch</Heading>
          </HeadingGroup>
        </Row>
        <Menus>
          <Table columns="0.4fr 3.2fr 1fr 1.1fr 1fr 1fr">
            <Table.Header>
              <StyledHeader>STT</StyledHeader>
              <StackedHeader
                label="Tên lịch sử"
                onClick={() => handleStackedClick("Name")}
                ascending={sortField === "Name" && sortOrder === "asc"}
                active={sortField === "Name"}
              />
              <StyledHeader>Loại giao dịch</StyledHeader>
              <StyledHeader>Số lượng</StyledHeader>
              <StyledHeader>Tỉ lệ chuyển đổi</StyledHeader>
              <StyledHeader>Ngày giao dịch</StyledHeader>
            </Table.Header>

            <Table.Body
              data={historiesByBrandId?.result}
              render={(history, index) => (
                <HistoryRow
                  key={history.id}
                  history={history}
                  index={index + 1}
                  displayedIndex={
                    (historiesByBrandId.currentPage - 1) *
                      historiesByBrandId.pageSize +
                    index +
                    1
                  }
                />
              )}
            />
            <Table.Footer>
              <Pagination
                count={historiesByBrandId?.rowCount}
                currentPage={currentPage}
                pageSize={historiesByBrandId?.pageSize}
                pageCount={historiesByBrandId?.pageCount}
                totalCount={historiesByBrandId?.totalCount}
              />
              <SetRowsPerPage
                pageSize={historiesByBrandId?.pageSize}
                onLimitChange={onLimitChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      </Container>
    </>
  );
}

export default HistoriesByBrandId;
