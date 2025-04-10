import { useState } from "react";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../../ui/Button";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { mockMajors, mockUniversities, mockLecturers } from "./mockLecturers";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

const StyledContainer = styled.div`
  position: relative;
`;

const StyledFilterOptions = styled.div`
  position: absolute;
  top: 115%;
  left: 0;
  width: 450px;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
`;

const StyledSelectWrapper = styled.div`
  margin-bottom: 10px;
`;

const AllocateButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  margin-left: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

function FilterOperations({ onTabChange = () => {} }) {
  const [showFilters, setShowFilters] = useState(false);
  const ref = useOutsideClick(() => setShowFilters(false));
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedOptionUniversity, setSelectedOptionUniversity] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenBulkForm, setIsOpenBulkForm] = useState(false);
  const filterValue = searchParams.get("stateIds") || "";

  const options = mockMajors.result.map((major) => ({
    value: major.id,
    label: major.majorName,
  }));

  const optionsUniversities = mockUniversities.result.map((university) => ({
    value: university.id,
    label: university.universityName,
  }));

  const lecturerOptions = mockLecturers.result.map((lecturer) => ({
    value: lecturer.id,
    label: lecturer.fullName,
  }));

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    if (selectedValues.length) {
      searchParams.set("majors", selectedValues);
    } else {
      searchParams.delete("majors");
    }
    setSearchParams(searchParams);
    setSelectedOption(selectedOptions);
  };

  const handleSelectChangeUniversity = (selectedOptionUniversity) => {
    const selectedValuesUniversity = selectedOptionUniversity.map((option) => option.value);
    if (selectedValuesUniversity.length) {
      searchParams.set("universities", selectedValuesUniversity);
    } else {
      searchParams.delete("universities");
    }
    setSearchParams(searchParams);
    setSelectedOptionUniversity(selectedOptionUniversity);
  };

  const handleAllocatePointsClick = () => {
    setIsOpenBulkForm(true);
  };

  const [selectedLecturers, setSelectedLecturers] = useState([]);
  const [pointsToAllocate, setPointsToAllocate] = useState(0);

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    const newPoints = selectedLecturers.map((lecturerId) => ({
      id: Date.now() + Math.random(), // Tạo ID tạm thời
      lecturerId,
      campusId: 1,
      pointsAllocated: parseInt(pointsToAllocate),
      pointsUsed: 0,
      pointsRemaining: parseInt(pointsToAllocate),
      allocationDate: new Date().toISOString().split("T")[0],
      state: "active",
    }));
    // Thêm logic để lưu vào mockLecturersPoints tại đây
    setIsOpenBulkForm(false);
  };

  return (
    <TableOperations>
      <Filter
        filterField="stateIds"
        options={[
          { value: "", label: "Tất cả" },
          { value: "1", label: "Chờ duyệt" },
          { value: "2", label: "Hoạt động" },
          { value: "3", label: "Không hoạt động" },
          { value: "4", label: "Từ chối" },
        ]}
        value={filterValue}
        onChange={(selectedValue) => {
          searchParams.set("filter", selectedValue);
          setSearchParams(searchParams);
        }}
      />

      <StyledContainer>
        <Button $variations="orange" onClick={() => setShowFilters(!showFilters)}>
          <StyledContainerButton>
            <StyledButton>
              <HiOutlineFunnel />
            </StyledButton>
            Bộ lọc
          </StyledContainerButton>
        </Button>

        {showFilters && (
          <StyledFilterOptions ref={ref}>
            <StyledSelectWrapper>
              <Select
                name="select"
                placeholder="Đại học..."
                options={optionsUniversities}
                isMulti
                value={selectedOptionUniversity}
                onChange={handleSelectChangeUniversity}
              />
            </StyledSelectWrapper>
            <Select
              name="select"
              placeholder="Chuyên ngành..."
              options={options}
              isMulti
              value={selectedOption}
              onChange={handleSelectChange}
            />
          </StyledFilterOptions>
        )}
      </StyledContainer>

      <AllocateButton onClick={handleAllocatePointsClick}>
        Phân bổ điểm
      </AllocateButton>

      {isOpenBulkForm && (
        <Modal isOpen={isOpenBulkForm} onClose={() => setIsOpenBulkForm(false)}>
          <Form onSubmit={handleBulkSubmit}>
            <FormRow label="Chọn giảng viên">
              <Select
                isMulti
                options={lecturerOptions}
                value={lecturerOptions.filter((opt) => selectedLecturers.includes(opt.value))}
                onChange={(selected) => setSelectedLecturers(selected.map((opt) => opt.value))}
                placeholder="Chọn giảng viên..."
              />
            </FormRow>
            <FormRow label="Số điểm phân bổ">
              <Input
                type="number"
                value={pointsToAllocate}
                onChange={(e) => setPointsToAllocate(e.target.value)}
              />
            </FormRow>
            <Button type="submit">Phân bổ</Button>
            <Button $variation="danger" onClick={() => setIsOpenBulkForm(false)}>
              Hủy
            </Button>
          </Form>
        </Modal>
      )}
    </TableOperations>
  );
}

export default FilterOperations;