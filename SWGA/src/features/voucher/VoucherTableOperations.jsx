import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddVoucher from "./AddVoucher";

function VoucherTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounced(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1"); // Reset về trang 1 khi search
    } else {
      params.delete("search");
    }
    
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, setSearchParams]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <TableOperations>
      <SearchBar 
        type="text"
        value={searchTerm}
        onChange={handleSearch} 
        placeholder="Nhập tên phiếu ưu đãi"
      />
      <AddVoucher />
    </TableOperations>
  );
}

export default VoucherTableOperations;
