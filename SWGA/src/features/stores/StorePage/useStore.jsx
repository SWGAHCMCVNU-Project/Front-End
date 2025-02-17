import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationContext from "../../../context/PaginationContext";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockStores } from "./mockStore";

export function useStore() {
    return useContext(PaginationContext);
}

export function StoreProvider({ children }) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { page, limit, handlePageChange, handleLimitChange } = useTablePagination(1, 10);
    const [sort, setSort] = useState("Id,desc");
    const [state, setState] = useState(null);
    const [areasFilter, setAreasFilter] = useState([]);
    const [areasFilterValue, setAreasFilterValue] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(true);

    //SEARCH
    const search = searchParams.get("search") !== "" ? searchParams.get("search") : null;

    const {
        isLoading,
        data: stores,
        error
    } = useQuery({
        queryKey: ["stores", { state, sort, search, page, limit, areasFilterValue }],
        queryFn: () => Promise.resolve(mockStores)
    });

    const { isLoading: isDeleting, mutate: removeStore } = useMutation({
        mutationFn: (id) => {
            // Giả lập xóa store
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(id);
                }, 1000);
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stores"] });
            setIsModalVisible(false);
        }
    });

    const value = {
        isLoading,
        isDeleting,
        stores,
        state,
        setState,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        sort,
        setSort,
        removeStore,
        areasFilter,
        areasFilterValue,
        setAreasFilter,
        setAreasFilterValue,
        isModalVisible,
        setIsModalVisible
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
}
