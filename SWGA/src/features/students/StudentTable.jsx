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
import useGetAllStudents from "../../hooks/student/useGetAllStudents";
import { useState } from "react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");

  // Lấy page, limit và search từ searchParams
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  // Lấy danh sách sinh viên
  const { students, totalCount, loading: isLoading } = useGetAllStudents({
    page: currentPage,
    size: limit,
    search: search,
  });

  const onLimitChange = (newLimit) => {
    searchParams.set("limit", newLimit);
    searchParams.set("page", 1); // Reset về trang 1 khi thay đổi limit
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  if (isLoading) return <Spinner />;
  if (!students?.length) return <Empty resourceName="sinh viên" />;

  const filteredStudents = filterStudentsByState(students, searchParams.get("state"));

  return (
    <Menus>
      <Table columns="0.4fr 2fr 1.5fr 1fr 1fr">
        <Table.Header>
          <StyledHeader>STT</StyledHeader>
          <StackedHeader
            label="Sinh viên"
            onClick={() => handleStackedClick("FullName")}
            ascending={sortField === "FullName" && sortOrder === "asc"}
            active={sortField === "FullName"}
          />
          <div>Liên hệ</div>
          <div>Campus</div>
          <StyledHeader>Trạng thái</StyledHeader>
        </Table.Header>

        <Table.Body
          data={filteredStudents}
          render={(student, index) => (
            <StyledButton>
              <StudentRow
                key={student.id}
                student={student}
                index={index + 1}
                displayedIndex={(currentPage - 1) * limit + index + 1}
              />
            </StyledButton>
          )}
        />
        <Table.Footer>
          <Pagination
            count={filteredStudents.length}
            currentPage={currentPage}
            pageSize={limit}
            pageCount={Math.ceil(totalCount / limit)}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
          <SetRowsPerPage pageSize={limit} onLimitChange={onLimitChange} />
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

  return students.filter((student) => student.state === parseInt(filterValue));
}