import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddPackagePoint from "./AddPackagePoint";

function PackageTableOperations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim() !== "") {
      params.set("search", searchTerm.trim());
      params.set("page", "1");
    } else {
      params.delete("search");
      params.set("page", "1");
    }
    setSearchParams(params);
  }, [searchTerm, setSearchParams]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !searchTerm.trim()) {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("size", searchParams.get("size") || "10");
      setSearchParams(params);
    }
  };

  return (
    <TableOperations>
      <SearchBar
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tên gói điểm"
      />
      <AddPackagePoint />
    </TableOperations>
  );
}

export default PackageTableOperations; 