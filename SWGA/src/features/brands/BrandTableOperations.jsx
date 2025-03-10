import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";

function BrandTableOperations() {
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
    <TableOperations>
      <SearchBar onChange={setSearchTerm} placeholder="Nhập tên thương hiệu" />
    </TableOperations>
  );
}

export default BrandTableOperations;
