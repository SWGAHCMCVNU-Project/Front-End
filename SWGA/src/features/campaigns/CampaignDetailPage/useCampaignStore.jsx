import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import useGetStoresByCampaignId from "../../../hooks/campaignDetail/useGetStoresByCampaignId";

export function useCampaignStore() {
    return useContext(PaginationContext);
}

export function CampaignStoreProvider({ children }) {
    const { campaignId } = useParams();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 5);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [brandsFilter, setBrandsFilter] = useState([]);
    const [brandsFilterValue, setBrandsFilterValue] = useState(null);
    const [areasFilter, setAreasFilter] = useState([]);
    const [areasFilterValue, setAreasFilterValue] = useState(null);

    const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    // Sử dụng hook mới với pagination
    const { stores, loading: isLoading, error, total, currentPage, totalPages } = useGetStoresByCampaignId(
        campaignId,
        search,
        page,
        limit
    );


    // Format dữ liệu cho component
    const campaignStores = {
        result: stores?.map(store => ({
            id: store.id,
            name: store.storeName,
            brand: store.brandName,
            avatar: store.avatar,
            email: store.email,
            phone: store.phone,
            address: store.address,
            openTime: store.openingHours,
            closeTime: store.closingHours,
            state: store.state ? "active" : "inactive"
        })) || [],
        total,
        page: currentPage,
        totalPages
    };


    const value = {
        isLoading,
        error,
        campaignStores,
        state,
        setState,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort,
        brandsFilter,
        brandsFilterValue,
        setBrandsFilter,
        setBrandsFilterValue,
        areasFilter,
        areasFilterValue,
        setAreasFilter,
        setAreasFilterValue,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}

// Add PropTypes validation
CampaignStoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Helper function để format thời gian
function formatTime(timeObj) {
    if (!timeObj) return "00:00";
    return timeObj;
}