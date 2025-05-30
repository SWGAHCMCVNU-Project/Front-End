import { useSearchParams } from "react-router-dom";
import RowPerPage from "../../ui/RowPerPage";
import TableOperations from "../../ui/TableOperations";

function SetRowsPerPage({ pageSize, onLimitChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLimitChange = (newLimit) => {
    const newSize = Number(newLimit);
    if (newSize !== pageSize) {
      const params = new URLSearchParams(searchParams);
      params.set("size", newSize.toString());
      params.set("page", "1");
      setSearchParams(params, { replace: true }); // Thêm { replace: true }
    }
  };

  // Đảm bảo pageSize có giá trị hợp lệ trước khi gọi toString()

  return (
    <TableOperations>
      <RowPerPage
        options={[
          { value: "5", label: "5" },
          { value: "10", label: "10" },
          { value: "15", label: "15" },
          { value: "20", label: "20" },
        ]}
        onLimitChange={handleLimitChange}
      />
    </TableOperations>
  );
}

export default SetRowsPerPage;