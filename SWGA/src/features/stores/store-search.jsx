import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import { NavigateCreateButton } from "../../ui/custom/Button/Button";
import styled from "styled-components";

const ProductFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

function StoreSearch() {
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
    <ProductFilterHeader>
      <div className="filtertabs-search-product">
        <SearchBar onChange={setSearchTerm} placeholder="Tìm kiếm cửa hàng" />
      </div>
      <div>
        <NavigateCreateButton navigateCreateURL="/stores/create" label="cửa hàng" />
      </div>
    </ProductFilterHeader>
  );
}

export default StoreSearch;