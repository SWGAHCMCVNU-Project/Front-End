import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useGetLecturers } from "../../hooks/lecturer/useGetLecturers";
import useGetCampusByAccountId from "../../hooks/campus/useGetCampusByAccount";
import StorageService from "../../services/storageService";

const Container = styled.div`
  margin: 0;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 3.3rem;
  width: 100%;
  box-sizing: border-box;
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
  width: 100%;
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
  const navigate = useNavigate();

  const accountId = StorageService.getAccountId();
  const role = StorageService.getRoleLogin();

  useEffect(() => {
    if (!accountId) {
      navigate("/login");
    }
    if (role !== "campus") {
      navigate("/dashboard");
    }
  }, [accountId, role, navigate]);

  const {
    data: campusData,
    isLoading: isCampusLoading,
    error: campusError,
  } = useGetCampusByAccountId(accountId);

  // Chỉ lấy campusId từ useGetCampusByAccountId hoặc searchParams
  const urlCampusId = campusData?.id || searchParams.get("campusId") || undefined;

  const searchName = searchParams.get("search") || "";
  const { lecturers, isLoading, error } = useGetLecturers({
    campusId: urlCampusId,
    searchName,
    page: currentPage,
    size: limit,
  });

  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  if (isCampusLoading || isLoading) return <Spinner />;
  if (campusError) {
    return <Empty resourceName="campus" message="Không thể tải thông tin campus" />;
  }
  if (!urlCampusId) {
    return <Empty resourceName="campus" message="Không tìm thấy thông tin campus" />;
  }
  if (error) {
    return <Empty resourceName="giảng viên" message={error.message} />;
  }

  const filteredBySearch = searchName
    ? lecturers.result.filter((lecturer) =>
        lecturer.fullName?.toLowerCase().includes(searchName.toLowerCase())
      )
    : lecturers.result;

  const filteredLecturers = filterLecturersByState(
    filteredBySearch,
    searchParams.get("state")
  );

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedLecturers = [...filteredLecturers].sort((a, b) => {
    if (sortField === "id") {
      return sortOrder === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    } else if (sortField === "fullName") {
      return sortOrder === "asc"
        ? (a.fullName || "").localeCompare(b.fullName || "")
        : (b.fullName || "").localeCompare(a.fullName || "");
    }
    return 0;
  });

  const pageSize = limit || 10;
  const totalCount = filteredLecturers.length;
  const pageCount = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLecturers = sortedLecturers.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleAllocatePoints = (pointData) => {
    setIsOpenForm(false);
    setSelectedLecturer(null);
  };

  return (
    <Container>
      <Row type="horizontal" style={{ width: "100%", margin: 0 }}>
        <FilterOperations />
        <LecturerTableOperations />
      </Row>
      <Row style={{ width: "100%", margin: 0 }}>
        {filteredLecturers.length === 0 ? (
          <Empty resourceName="giảng viên" />
        ) : (
          <Menus>
            <Table columns="0.5fr 2fr 0.5fr 1.9fr 1fr 1fr 1fr">
              <Table.Header style={{ width: "100%" }}>
                <StyledHeader>STT</StyledHeader>
                <StackedHeader
                  label="Giảng viên"
                  onClick={() => handleStackedClick("fullName")}
                  ascending={sortField === "fullName" && sortOrder === "asc"}
                  active={sortField === "fullName"}
                />
                <StyledHeader>Liên hệ</StyledHeader>
                <StyledHeader>Đại học</StyledHeader>
                <StyledHeader>Trạng thái</StyledHeader>
                <StyledHeader>Số dư</StyledHeader>
                <StyledHeader>Hành động</StyledHeader>
              </Table.Header>

              <Table.Body
                data={paginatedLecturers}
                render={(lecturer, index) => (
                  <StyledButton>
                    <LecturerRow
                      key={lecturer.id}
                      lecturer={lecturer}
                      index={startIndex + index + 1}
                      onAllocate={() => {
                        setSelectedLecturer(lecturer);
                        setIsOpenForm(true);
                      }}
                    />
                  </StyledButton>
                )}
              />
              <Table.Footer>
                <Pagination
                  count={totalCount}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  pageCount={pageCount}
                  onPageChange={setCurrentPage}
                />
                <SetRowsPerPage
                  pageSize={pageSize}
                  onLimitChange={onLimitChange}
                />
              </Table.Footer>
            </Table>

            {isOpenForm && selectedLecturer && (
              <Modal isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = {
                      pointsAllocated: e.target.pointsAllocated.value,
                    };
                    handleAllocatePoints(formData);
                  }}
                >
                  <FormRow label="Số điểm phân bổ">
                    <Input
                      type="number"
                      name="pointsAllocated"
                      defaultValue={0}
                    />
                  </FormRow>
                  <Button type="submit">Phân bổ</Button>
                  <Button
                    $variation="danger"
                    onClick={() => setIsOpenForm(false)}
                  >
                    Hủy
                  </Button>
                </Form>
              </Modal>
            )}
          </Menus>
        )}
      </Row>
    </Container>
  );
}

function filterLecturersByState(lecturers, filterValue) {
  if (!filterValue || filterValue === "all") {
    return lecturers;
  }
  return lecturers.filter(
    (lecturer) => (lecturer.state ?? false) === (filterValue === "true")
  );
}

export default Lecturers;