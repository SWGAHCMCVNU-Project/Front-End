// hooks/store/useStore.js
import { useState, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useStores } from "../../hooks/store/useStores"; // Đảm bảo đường dẫn đúng
import toast from "react-hot-toast";

// Tạo Context cho Store
const StoreContext = createContext();

// Hook để sử dụng StoreContext
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

// StoreProvider để cung cấp dữ liệu cho các component con
export function StoreProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("storeName,asc");
  const [state, setState] = useState(null);
  const [areasFilter, setAreasFilter] = useState([]);
  const [areasFilterValue, setAreasFilterValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchName, setSearchName] = useState(searchParams.get("search") || "");

  // Lấy danh sách cửa hàng từ useStores
  const { stores, isLoading, error } = useStores({
    searchName,
    page,
    size: limit,
    state: state === null ? undefined : state,
    areaId: areasFilterValue,
    sort,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (newSize) => {
    setLimit(newSize);
    setPage(1); // Reset về trang đầu tiên
  };
  const value = {
    stores,
    isLoading,
    error,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    sort,
    setSort,
    state,
    setState,
    areasFilter,
    setAreasFilter,
    areasFilterValue,
    setAreasFilterValue,
    isModalVisible,
    setIsModalVisible,
    searchName,
    setSearchName,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}