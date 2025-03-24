import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddCampaignType from "./AddCampaignType";

function CampaignTypeTableOperations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      const currentSearchName = params.get("searchName") || "";
  
      // Chỉ cập nhật nếu searchTerm thực sự thay đổi
      if (searchTerm.trim() !== currentSearchName) {
        if (searchTerm.trim()) {
          params.set("searchName", searchTerm.trim());
        } else {
          params.delete("searchName");
        }
        params.set("page", "1"); // Reset page chỉ khi searchTerm thay đổi
        setSearchParams(params, { replace: true });
      }
    }, 500); // Thêm debounce để tránh reset liên tục khi gõ
  
    return () => clearTimeout(timer);
  }, [searchTerm, searchParams, setSearchParams]);

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
        placeholder="Nhập tên loại chiến dịch"
      />
      <AddCampaignType />
    </TableOperations>
  );
}

export default CampaignTypeTableOperations;