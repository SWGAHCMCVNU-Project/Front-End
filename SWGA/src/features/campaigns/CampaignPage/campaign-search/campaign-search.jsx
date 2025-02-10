import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDebounced } from "../../../../hooks/useDebounced";
import SearchBar from "../../../../ui/SearchBar";
import { NavigateCreateButton } from "../../../../ui/custom/Button/Button";
import "./campaign-search.scss";

function CampaignSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounced(searchTerm, 500);
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Xác định role từ URL
    const { pathname } = useLocation();
    const role = pathname.includes('brand') ? 'Brand' 
               : pathname.includes('admin') ? 'Admin'
               : pathname.includes('staff') ? 'Staff'
               : null;

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
            <div>
                <SearchBar onChange={setSearchTerm} placeholder="Tìm kiếm chiến dịch" />
            </div>
            {
                role === "Brand" ? (
                    <div className="nav-create">
                        <NavigateCreateButton
                            navigateCreateURL='/campaigns/create'
                            label='chiến dịch' />
                    </div>
                ) : (
                    null
                )
            }
        </div>
    );
};

export default CampaignSearch;