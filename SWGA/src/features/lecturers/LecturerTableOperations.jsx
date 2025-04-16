/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";
import TableOperations from "../../ui/TableOperations";
import AddAccountLecturer from "./AddAccountLecturer"
function LecturerTableOperations(campusId) {
  const [searchName, setSearchName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchName !== "") {
      searchParams.set("search", searchName);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }, [searchName, searchParams, setSearchParams]);

  return (
    
    <TableOperations>
      
      <SearchBar
        value={searchName} // Still pass value, though SearchBar doesn't use it
        onChange={(value) => setSearchName(value)} // Accept the value directly
        placeholder="Nhập tên giảng viên"
      />
      <AddAccountLecturer campusId={campusId} /> 
      </TableOperations>
  );
}

export default LecturerTableOperations;