import { useState } from "react";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../../ui/Button";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import useGetAllCampuses from "../../hooks/campus/useGetAllCampuses";

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
  const [selectedOptionCampus, setSelectedOptionCampus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get("stateIds") || "";

  const { data: campusesData, isLoading: isLoadingCampuses } = useGetAllCampuses();

  const optionsCampuses = campusesData?.result?.map((campus) => ({
    value: campus.id,
    label: campus.campusName,
  })) || [];

  const handleSelectChangeCampus = (selectedOptionCampus) => {
    const selectedValuesCampus = selectedOptionCampus.map((option) => option.value);
    if (selectedValuesCampus.length) {
      searchParams.set("campuses", selectedValuesCampus);
    } else {
      searchParams.delete("campuses");
    }
    setSearchParams(searchParams);
    setSelectedOptionCampus(selectedOptionCampus);
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
                placeholder={isLoadingCampuses ? "Đang tải campus..." : "Campus..."}
                options={optionsCampuses}
                isMulti
                value={selectedOptionCampus}
                onChange={handleSelectChangeCampus}
                isDisabled={isLoadingCampuses}
              />
            </StyledSelectWrapper>
          </StyledFilterOptions>
        )}
      </StyledContainer>
    </TableOperations>
  );
}

export default FilterOperations;