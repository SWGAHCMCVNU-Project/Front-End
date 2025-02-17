import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../hooks/useDebounced";
import SearchBar from "../../../ui/SearchBar";
import { NavigateCreateButton } from "../../../ui/custom/Button/Button";

function StoreSearch() {
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
        <div className="product-filter-header">
            <div className="filtertabs-search-product">
                <SearchBar onChange={setSearchTerm} placeholder="Tìm kiếm cửa hàng" />
            </div>
            <div>
                <NavigateCreateButton
                    navigateCreateURL='/stores/create'
                    label='cửa hàng' />
            </div>
        </div>
    );
};

export default StoreSearch;