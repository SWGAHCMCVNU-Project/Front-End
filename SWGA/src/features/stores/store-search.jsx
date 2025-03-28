import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import { NavigateCreateButton } from "../../ui/custom/Button/Button";
import styled from "styled-components";
import { useStore } from "./useStore"; // Import useStore để đồng bộ searchName

const ProductFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

function StoreSearch() {
  const { searchName, setSearchName } = useStore(); // Lấy searchName và setSearchName từ useStore
  const [searchTerm, setSearchTerm] = useState(searchName || ""); // Đồng bộ với searchName từ context
  const debouncedSearch = useDebounced(searchTerm, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedSearch !== "") {
      searchParams.set("search", debouncedSearch);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
    setSearchName(debouncedSearch); // Cập nhật searchName trong useStore
  }, [debouncedSearch, searchParams, setSearchParams, setSearchName]);

  return (
    <ProductFilterHeader>
      <div className="filtertabs-search-product">
        <SearchBar
          value={searchTerm} // Sử dụng searchTerm thay vì trực tiếp từ useStore
          onChange={setSearchTerm}
          placeholder="Tìm kiếm cửa hàng"
        />
      </div>
      <div>
        <NavigateCreateButton navigateCreateURL="/stores/create" label="cửa hàng" />
      </div>
    </ProductFilterHeader>
  );
}

export default StoreSearch;