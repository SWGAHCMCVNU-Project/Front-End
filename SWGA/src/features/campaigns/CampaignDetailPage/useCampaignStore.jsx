import { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import useGetCampaignById from "../../../hooks/campaign/useGetCampaignById"; // Import custom hook

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

    // Lấy giá trị tìm kiếm từ searchParams (hiện tại không được sử dụng vì API không hỗ trợ)
    const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    // Sử dụng custom hook useGetCampaignById
    const {
        isLoading,
        data: campaignData,
        error,
    } = useGetCampaignById(campaignId);

    // Giả định campaignData chứa danh sách stores trong campaign (ví dụ: campaignData.stores)
    // Vì không có phân trang từ API, ta tự phân trang trên frontend
    const allStores = campaignData?.stores || [];
    const totalStores = allStores.length;
    
    // Tính toán phân trang trên frontend
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedStores = allStores.slice(startIndex, endIndex);

    // Định dạng campaignStores theo cấu trúc { result: [], total: number }
    const campaignStores = {
        result: paginatedStores,
        total: totalStores,
    };

    useEffect(() => {
        if (error) {
            console.error("API error in CampaignStoreProvider:", error);
        }
    }, [error]);

    const value = {
        isLoading,
        campaignStores, // Truyền danh sách stores đã phân trang
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