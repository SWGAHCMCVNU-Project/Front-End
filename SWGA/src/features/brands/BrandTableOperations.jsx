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
    const prevSearch = params.get("searchName") || "";

    if (debouncedSearch.trim() !== prevSearch) {
      if (debouncedSearch.trim()) {
        params.set("searchName", debouncedSearch.trim());
        params.set("page", "1"); // Reset về trang 1 khi search thay đổi
      } else {
        params.delete("searchName");
        params.set("page", "1"); // Reset về trang 1 khi xóa search
      }
      setSearchParams(params, { replace: true });
    }
  }, [debouncedSearch, setSearchParams, searchParams]);  // Loại searchParams khỏi dependency để tránh loop

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