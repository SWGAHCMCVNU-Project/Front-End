import { useState } from "react";

export const useTablePagination = (initialPage, initialLimit) => {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
    };

    return {
        page,
        limit,
        handlePageChange,
        handleLimitChange,
    };
};