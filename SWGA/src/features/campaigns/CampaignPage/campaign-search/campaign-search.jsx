import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDebounced } from "../../../../hooks/useDebounced";
import SearchBar from "../../../../ui/SearchBar";
import { NavigateCreateButton } from "../../../../ui/custom/Button/Button";
import "./campaign-search.scss";

function CampaignSearch() {
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
        <div className="order-filter-header">
            <div className="search-bar-container">
                <SearchBar onChange={setSearchTerm} placeholder="Tìm kiếm chiến dịch" />
            </div>
            <div className="nav-create">
                <NavigateCreateButton
                    navigateCreateURL="/campaigns/create"
                    label="chiến dịch"
                />
            </div>
        </div>
    );
}

export default CampaignSearch;