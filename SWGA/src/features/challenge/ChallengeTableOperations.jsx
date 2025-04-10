import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddChallenge from "./AddChallenge";

function ChallengeTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounced(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    params.set("size", searchParams.get("size") || "10");
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, searchParams, setSearchParams]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
        params.set("page", "1");
      } else {
        params.delete("search");
      }
      params.set("size", searchParams.get("size") || "10");
      setSearchParams(params, { replace: true });
    }
  };

  return (
    <TableOperations>
      <SearchBar
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tên thử thách"
      />
      <AddChallenge />
    </TableOperations>
  );
}

export default ChallengeTableOperations;