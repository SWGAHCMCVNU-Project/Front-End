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
import LecturerRow from "./LecturerRow";
import FilterOperations from "./FilterOperations";
import LecturerTableOperations from "./LecturerTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { mockLecturers, mockLecturersPoints } from "./mockLecturers";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem 0.5rem;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

function Lecturers() {
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);

  const lecturers = mockLecturers.result;

  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  if (!lecturers?.length) return <Empty resourceName="giảng viên" />;

  const filteredLecturers = filterLecturersByState(
    lecturers,
    searchParams.get("state")
  );

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedLecturers = [...filteredLecturers].sort((a, b) => {
    if (sortField === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortField === "FullName") {
      return sortOrder === "asc"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    }
    return 0;
  });

  const pageSize = limit || 10;
  const totalCount = sortedLecturers.length;
  const pageCount = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLecturers = sortedLecturers.slice(startIndex, startIndex + pageSize);

  // Hàm tính tổng điểm của từng giảng viên
  const getLecturerPoints = (lecturerId) => {
    const points = mockLecturersPoints.filter((point) => point.lecturerId === lecturerId);
    if (!points.length) return { pointsAllocated: 0, pointsUsed: 0, pointsRemaining: 0 };

    return points.reduce(
      (acc, point) => ({
        pointsAllocated: acc.pointsAllocated + point.pointsAllocated,
        pointsUsed: acc.pointsUsed + point.pointsUsed,
        pointsRemaining: acc.pointsRemaining + point.pointsRemaining,
      }),
      { pointsAllocated: 0, pointsUsed: 0, pointsRemaining: 0 }
    );
  };

  // Hàm xử lý phân bổ điểm
  const handleAllocatePoints = (pointData) => {
    const newPoint = {
      id: Date.now() + Math.random(),
      lecturerId: selectedLecturer.id,
      campusId: 1,
      pointsAllocated: parseInt(pointData.pointsAllocated),
      pointsUsed: 0,
      pointsRemaining: parseInt(pointData.pointsAllocated),
      allocationDate: new Date().toISOString().split("T")[0],
      state: "active",
    };
    // Cập nhật mockLecturersPoints (giả lập)
    mockLecturersPoints.push(newPoint);
    setIsOpenForm(false);
    setSelectedLecturer(null); // Reset sau khi phân bổ
  };

  return (
    <Container>
      {/* <Heading as="h1">Giảng viên</Heading> */}
      <Row type="horizontal">
        <FilterOperations />
        <LecturerTableOperations />
      </Row>
      <Row>
        <Menus>
          <Table columns="0.4fr 1.8fr 1.7fr 0.9fr 1.7fr 1.2fr 1.1fr 1fr 1fr 1fr 1fr 1fr">
            <Table.Header>
              <StyledHeader>STT</StyledHeader>
              <StackedHeader
                label="Giảng viên"
                onClick={() => handleStackedClick("FullName")}
                ascending={sortField === "FullName" && sortOrder === "asc"}
                active={sortField === "FullName"}
              />
              <div>Liên hệ</div>
              <div>Đại học</div>
              <StyledHeader>Chuyên ngành</StyledHeader>
              <StyledHeader>Trạng thái</StyledHeader>
              <StyledHeader>Điểm hiện có</StyledHeader>
              <StyledHeader>Điểm đã phân bổ</StyledHeader>
              <StyledHeader>Điểm đã sử dụng</StyledHeader>
              <StyledHeader>Điểm còn lại</StyledHeader>
              <StyledHeader>Hành động</StyledHeader>
            </Table.Header>

            <Table.Body
              data={paginatedLecturers}
              render={(lecturer, index) => {
                const points = getLecturerPoints(lecturer.id);
                return (
                  <StyledButton>
                    <LecturerRow
                      key={lecturer.id}
                      lecturer={lecturer}
                      index={startIndex + index + 1}
                      pointsRemaining={points.pointsRemaining}
                      pointsAllocated={points.pointsAllocated}
                      pointsUsed={points.pointsUsed}
                      onAllocate={() => {
                        setSelectedLecturer(lecturer);
                        setIsOpenForm(true);
                      }}
                    />
                  </StyledButton>
                );
              }}
            />
            <Table.Footer>
              <Pagination
                count={totalCount}
                currentPage={currentPage}
                pageSize={pageSize}
                pageCount={pageCount}
                onPageChange={setCurrentPage}
              />
              <SetRowsPerPage pageSize={pageSize} onLimitChange={onLimitChange} />
            </Table.Footer>
          </Table>

          {isOpenForm && selectedLecturer && (
            <Modal isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}>
              <Form onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  pointsAllocated: e.target.pointsAllocated.value,
                };
                handleAllocatePoints(formData);
              }}>
                <FormRow label="Số điểm phân bổ">
                  <Input
                    type="number"
                    name="pointsAllocated"
                    defaultValue={0}
                  />
                </FormRow>
                <Button type="submit">Phân bổ</Button>
                <Button $variation="danger" onClick={() => setIsOpenForm(false)}>Hủy</Button>
              </Form>
            </Modal>
          )}
        </Menus>
      </Row>
    </Container>
  );
}

function filterLecturersByState(lecturers, filterValue) {
  if (!filterValue || filterValue === "all") {
    return lecturers;
  }
  return lecturers.filter((lecturer) => lecturer.state === (filterValue === "true"));
}

export default Lecturers;