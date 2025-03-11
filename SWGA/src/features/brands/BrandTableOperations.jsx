import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";

function BrandTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("searchName") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounced(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch.trim()) {
      params.set("searchName", debouncedSearch.trim());
      params.set("page", "1");
    } else {
      params.delete("searchName"); // Xóa searchName khi rỗng
      params.set("page", "1");
    }

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, searchParams, setSearchParams]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <TableOperations>
      <SearchBar 
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Nhập tên thương hiệu"
      />
    </TableOperations>
  );
}

export default BrandTableOperations;