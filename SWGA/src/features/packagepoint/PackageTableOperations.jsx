import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddPackagePoint from "./AddPackagePoint";

function PackageTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchName") || "");
  const debouncedSearch = useDebounced(searchTerm, 500);

  // Cập nhật searchParams khi debouncedSearch thay đổi (search real-time)
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("searchName", debouncedSearch);
      params.set("page", "1");
    } else {
      params.delete("searchName");
    }
    params.set("size", searchParams.get("size") || "10");
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, searchParams, setSearchParams]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Xử lý khi nhấn Enter: cập nhật searchParams ngay lập tức
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      if (searchTerm.trim()) {
        params.set("searchName", searchTerm.trim());
        params.set("page", "1");
      } else {
        params.delete("searchName");
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
        onKeyDown={handleKeyDown} // Thêm onKeyDown để xử lý Enter
        placeholder="Nhập tên gói điểm"
      />
      <AddPackagePoint />
    </TableOperations>
  );
}

export default PackageTableOperations;