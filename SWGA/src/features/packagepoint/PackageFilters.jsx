import styled from "styled-components";
import SearchBar from "../../ui/SearchBar";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useEffect } from "react"; // Loại bỏ useContext
import usePackages from "./usePackages"; // Sử dụng usePackages thay vì context

const FilterContainer = styled(TableOperations)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-grey-50);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

function PackageFilters({ onSearch, onFilter }) {
  const { setSearchTerm, setFilterState } = usePackages(); // Gọi usePackages để lấy setSearchTerm và setFilterState

  return (
    <FilterContainer>
      <SearchBar 
        onChange={setSearchTerm} 
        placeholder="Tìm kiếm gói điểm (tên, ngày)" 
        style={{
          border: '1px solid var(--color-grey-300)',
          borderRadius: '8px',
          padding: '0.6rem 1rem',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--color-blue-500)'}
        onBlur={e => e.target.style.borderColor = 'var(--color-grey-300)'}
      />
      <Filter
        filterField="state"
        options={[
          { value: "", label: "Tất cả" },
          { value: "active", label: "Hoạt động" },
          { value: "inactive", label: "Không hoạt động" },
          { value: "expired", label: "Hết hạn" },
        ]}
        onChange={setFilterState}
      />
    </FilterContainer>
  );
}

export default PackageFilters;