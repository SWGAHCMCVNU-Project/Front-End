import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useState } from "react";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import ChallengeRow from "./ChallengeRow";
import Empty from "./Empty";
import FilterOperationsChallenge from "./FilterOperationsChallenge";
import SetRowsPerPage from "./SetRowsPerPage";
import { useChallengesByStudentId } from "./useChallengesByStudentId";

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

function ChallengesByStudentId() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { challengesByStudentId, isLoading: challengesLoading } =
    useChallengesByStudentId(limit, sortField, sortOrder);

  const [currentPage, setCurrentPage] = useState(1);
  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  if (challengesLoading) return <Spinner />;

  if (!challengesByStudentId?.result?.length)
    return (
      <>
        <Container>
          <Row type="horizontal">
            <HeadingGroup>
              <Heading as="h2">Danh sách thử thách tặng đậu</Heading>
            </HeadingGroup>
          </Row>

          <Row type="horizontal">
            <FilterOperationsChallenge />
          </Row>
          <Empty resourceName="thử thách" />
        </Container>
      </>
    );

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách thử thách tặng đậu</Heading>
          </HeadingGroup>
        </Row>

        <Row type="horizontal">
          <FilterOperationsChallenge />
        </Row>
        <Menus>
          <Table columns="0.7fr 2.2fr 1.6fr 1.2fr 1.1fr">
            <Table.Header>
              <StyledHeader>STT</StyledHeader>
              <StackedHeader
                label="Tên thử thách"
                onClick={() => handleStackedClick("Id")}
                $ascending={sortField === "Id" && sortOrder === "asc"}
                $active={sortField === "Id"}
              />
              <StyledHeader>Loại thử thách</StyledHeader>
              <StyledHeader>Số lượng</StyledHeader>

              <StyledHeader>Trạng thái</StyledHeader>
            </Table.Header>

            <Table.Body
              data={challengesByStudentId?.result}
              render={(challenge, index) => (
                <ChallengeRow
                  key={challenge.id}
                  challenge={challenge}
                  index={index + 1}
                  displayedIndex={
                    (challengesByStudentId.currentPage - 1) *
                      challengesByStudentId.pageSize +
                    index +
                    1
                  }
                />
              )}
            />
            <Table.Footer>
              <Pagination
                count={challengesByStudentId?.rowCount}
                currentPage={currentPage}
                pageSize={challengesByStudentId?.pageSize}
                pageCount={challengesByStudentId?.pageCount}
                totalCount={challengesByStudentId?.totalCount}
              />
              <SetRowsPerPage
                pageSize={challengesByStudentId?.pageSize}
                onLimitChange={onLimitChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      </Container>
    </>
  );
}

export default ChallengesByStudentId;
