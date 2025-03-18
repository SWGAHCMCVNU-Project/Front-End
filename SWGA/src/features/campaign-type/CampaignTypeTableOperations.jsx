import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddCampaignType from "./AddCampaignType";

function CampaignTypeTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchName") || ""); // Changed to searchName
  const debouncedSearch = useDebounced(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("searchName", debouncedSearch); // Changed to searchName
      params.set("page", "1");
    } else {
      params.delete("searchName"); // Changed to searchName
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
        placeholder="Nhập tên loại chiến dịch" // Updated placeholder
      />
      <AddCampaignType />
    </TableOperations>
  );
}

export default CampaignTypeTableOperations;