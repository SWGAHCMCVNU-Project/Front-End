// feedback-search.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../hooks/useDebounced";
import SearchBar from "../../../ui/SearchBar";
import { NavigateCreateButton } from "../../../ui/custom/Button/Button";
import styled from "styled-components";

const FeedbackFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

function FeedbackSearch() {
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
    <FeedbackFilterHeader>
      <div className="filtertabs-search-feedback">
        <SearchBar onChange={setSearchTerm} placeholder="Tìm kiếm phản hồi" />
      </div>
      <div>
        <NavigateCreateButton navigateCreateURL="/feedback/create" label="phản hồi" />
      </div>
    </FeedbackFilterHeader>
  );
}

export default FeedbackSearch;
