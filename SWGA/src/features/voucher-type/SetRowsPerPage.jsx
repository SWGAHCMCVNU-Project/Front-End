import { useSearchParams } from "react-router-dom";
import RowPerPage from "../../ui/RowPerPage";
import TableOperations from "../../ui/TableOperations";

function SetRowsPerPage({ pageSize, onLimitChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLimitChange = (newLimit) => {
    if (Number(newLimit) !== pageSize) {
      onLimitChange(Number(newLimit));
      searchParams.set("size", newLimit); // Cập nhật size trong searchParams
      setSearchParams(searchParams, { replace: true });
    }
  };

  // Đảm bảo pageSize có giá trị hợp lệ trước khi gọi toString()
  const safePageSize = pageSize !== undefined && !isNaN(pageSize) ? pageSize : 10;

  return (
    <TableOperations>
      <RowPerPage
        options={[
          { value: "5", label: "5" },
          { value: "10", label: "10" },
          { value: "15", label: "15" },
          { value: "20", label: "20" },
        ]}
        value={safePageSize.toString()}
        onLimitChange={handleLimitChange}
      />
    </TableOperations>
  );
}

export default SetRowsPerPage;