import { useState } from "react";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import useOutsideClickFilter from "../../../../hooks/useOutsideClickFilter";
import ButtonCustom from "../../Button/ButtonCustom";

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
  z-index: 2;
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

export const MySelectFilter = ({ paramName, selectOption, selectName, placeholder, optionFilter, valueFilter }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSelectChange = (selectedOption) => {
        const selectedValues = selectedOption.map(
            (option) => option.value
        );

        if (selectedValues) {
            searchParams.set(paramName, selectedValues);
        } else {
            searchParams.set(paramName, null);
        }
        setSearchParams(searchParams);
        selectOption(selectedOption);
    };

    return (
        <StyledSelectWrapper>
            <Select
                name={selectName}
                placeholder={placeholder}
                options={optionFilter}
                isMulti
                maxMenuHeight={200}
                value={valueFilter}
                onChange={handleSelectChange}
            />
        </StyledSelectWrapper>
    );
}

function MyFilter({ children }) {
    const [showFilters, setShowFilters] = useState(false);
    const ref = useOutsideClickFilter(setShowFilters);

    return (
        <StyledContainer>
            <ButtonCustom
                $variations="orange"
                onClick={() => setShowFilters(!showFilters)}
            >
                <StyledContainerButton>
                    <StyledButton>
                        <HiOutlineFunnel />
                    </StyledButton>
                    Bộ lọc
                </StyledContainerButton>
            </ButtonCustom>


            {showFilters && (
                <StyledFilterOptions ref={ref}>
                    {children}
                </StyledFilterOptions>
            )}

        </StyledContainer>
    );
}

export default MyFilter;
