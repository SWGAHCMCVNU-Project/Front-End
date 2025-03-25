// components/SearchCampus.js
import { useEffect, useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useDebounced } from "../../../hooks/useDebounced";
import Modal from "../../../ui/Modal";
import SearchBar from "../../../ui/SearchBar";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import CampusFormUpdate from "../ModalCampusUpdate/campus-form-update"; // Update the path if needed

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.1rem;
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

function SearchCampus() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounced(searchTerm, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedSearch !== "") {
      searchParams.set("search", debouncedSearch);
    } else {
      searchParams.delete("search");
    }

    setSearchParams(searchParams);
  }, [debouncedSearch, searchParams, setSearchParams]);

  return (
    <SearchWrapper>
      <div className="filtertabs-search-product">
        <SearchBar onChange={setSearchTerm} placeholder="Tìm kiếm campus" />
      </div>
      <Modal>
        <Modal.Open opens="campus-form">
          <ButtonCustom>
            <StyledContainerButton>
              <StyledButton>
                <HiMiniPlus />
              </StyledButton>
              Thêm campus
            </StyledContainerButton>
          </ButtonCustom>
        </Modal.Open>
        <Modal.Window name="campus-form">
          <CampusFormUpdate />
        </Modal.Window>
      </Modal>
    </SearchWrapper>
  );
}

export default SearchCampus;