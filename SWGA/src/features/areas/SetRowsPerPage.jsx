import { useSearchParams } from "react-router-dom";
import RowPerPage from "../../ui/RowPerPage";
import TableOperations from "../../ui/TableOperations";

function SetRowsPerPage({ pageSize, onLimitChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLimitChange = (newLimit) => {
    if (Number(newLimit) !== pageSize) {
      onLimitChange(newLimit);
      searchParams.set("limit", newLimit);

      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  };

  return (
    <TableOperations>
      <RowPerPage
        options={[
          { value: "5", label: "5" },
          { value: "10", label: "10" },
          { value: "15", label: "15" },
          { value: "20", label: "20" },
        ]}
        value={pageSize.toString()}
        onLimitChange={handleLimitChange}
      />
    </TableOperations>
  );
}

export default SetRowsPerPage;
