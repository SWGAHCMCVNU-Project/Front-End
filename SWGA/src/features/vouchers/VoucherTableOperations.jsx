import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddVoucher from "./AddVoucher";

function VoucherTableOperations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");
    setSearchParams(params);
  }, [searchTerm, searchParams, setSearchParams]);

  return (
    <TableOperations>
      <SearchBar onChange={setSearchTerm} placeholder="Nhập tên ưu đãi" />
      <AddVoucher />
    </TableOperations>
  );
}

export default VoucherTableOperations;