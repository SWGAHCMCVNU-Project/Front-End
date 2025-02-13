import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import SetRowsPerPage from "./SetRowsPerPage";
import StudentRow from "./StudentRow";
import { useStudents } from "./useStudents";

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

function StudentTable() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { students, isLoading } = useStudents(limit, sortField, sortOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!students?.result?.length) return <Empty resourceName="sinh viên" />;

  const filteredStudents = filterStudentsByState(
    students.result,
    searchParams.get("state")
  );

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <Menus>
      <Table columns="0.4fr 1.8fr 1.7fr 0.9fr 1.7fr 1.2fr 1.1fr">
        <Table.Header>
          <StyledHeader>STT</StyledHeader>
          <StackedHeader
            label="Sinh viên"
            onClick={() => handleStackedClick("FullName")}
            ascending={sortField === "FullName" && sortOrder === "asc"}
            active={sortField === "FullName"}
          />
          <div>Liên hệ</div>
          <div>Đại học</div>
          <StyledHeader>Chuyên ngành</StyledHeader>
          <StyledHeader>Trạng thái</StyledHeader>
          <StyledHeader>Hành động</StyledHeader>
        </Table.Header>

        <Table.Body
          data={filteredStudents}
          render={(student, index) => (
            <StyledButton>
              <StudentRow
                key={student.id}
                student={student}
                index={index + 1}
                displayedIndex={
                  (students.currentPage - 1) * students.pageSize + index + 1
                }
              />
            </StyledButton>
          )}
        />
        <Table.Footer>
          <Pagination
            count={students?.rowCount}
            currentPage={currentPage}
            pageSize={students?.pageSize}
            pageCount={students?.pageCount}
            totalCount={students?.totalCount}
          />
          <SetRowsPerPage
            pageSize={students?.pageSize}
            onLimitChange={onLimitChange}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default StudentTable;

function filterStudentsByState(students, filterValue) {
  if (!filterValue || filterValue === "all") {
    return students;
  }

  const filteredStudents = students.filter((student) => {
    return student.state === (filterValue === "true");
  });

  return filteredStudents;
}
