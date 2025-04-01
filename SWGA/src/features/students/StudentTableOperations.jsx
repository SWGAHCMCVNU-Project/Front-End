import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";

function StudentTableOperations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchTerm !== "") {
      searchParams.set("search", searchTerm);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }, [searchTerm, searchParams, setSearchParams]);

  return (
    <TableOperations>
      <SearchBar onChange={setSearchTerm} placeholder="Nhập tên sinh viên" />
    </TableOperations>
  );
}

export default StudentTableOperations;