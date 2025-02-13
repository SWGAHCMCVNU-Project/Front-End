import { useEffect, useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useDebounced } from "../../../hooks/useDebounced";
import Modal from "../../../ui/Modal";
import SearchBar from "../../../ui/SearchBar";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";

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

function SearchMajor() {
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
        <div className="product-filter-header">
            <div className="filtertabs-search-product">
                <SearchBar onChange={setSearchTerm} placeholder="Tìm kiếm chuyên ngành học" />
            </div>
            <div>
               
            </div>
        </div>
    );
};

export default SearchMajor;