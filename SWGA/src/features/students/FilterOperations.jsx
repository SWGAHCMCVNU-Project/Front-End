import { useState } from "react";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../../ui/Button";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useMajorsFilter } from "./useMajorsFilter";
import { useUniversitiesFilter } from "./useUniversitiesFilter";

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

function FilterOperations() {
  const [showFilters, setShowFilters] = useState(false);
  const ref = useOutsideClick(setShowFilters);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedOptionUniversity, setSelectedOptionUniversity] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get("stateIds") || "";

  const { majorsFilter } = useMajorsFilter();
  const { universitiesFilter } = useUniversitiesFilter();

  const options = majorsFilter?.result.map((major) => ({
    value: major.id,
    label: major.majorName,
  }));

  const optionsUniversities = universitiesFilter?.result.map((university) => ({
    value: university.id,
    label: university.universityName,
  }));

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    if (selectedValues) {
      searchParams.set("majors", selectedValues);
    } else {
      searchParams.set("majors", null);
    }
    setSearchParams(searchParams);
    setSelectedOption(selectedOptions);
  };

  const handleSelectChangeUniversity = (selectedOptionUniversity) => {
    const selectedValuesUniversity = selectedOptionUniversity.map(
      (option) => option.value
    );

    if (selectedValuesUniversity) {
      searchParams.set("universities", selectedValuesUniversity);
    } else {
      searchParams.set("universities", null);
    }
    setSearchParams(searchParams);
    setSelectedOptionUniversity(selectedOptionUniversity);
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
        }}
      />

      <StyledContainer>
        <Button
          $variations="orange"
          onClick={() => setShowFilters(!showFilters)}
        >
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
    </TableOperations>
  );
}

export default FilterOperations;
