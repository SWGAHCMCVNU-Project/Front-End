import { useSearchParams } from "react-router-dom";
import RowPerPage from "../../ui/RowPerPage";
import TableOperations from "../../ui/TableOperations";
import PropTypes from "prop-types";

function SetRowsPerPage({ size, onChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSizeChange = (newSize) => {
    if (Number(newSize) !== size) {
      onChange(Number(newSize));
      searchParams.set("size", newSize);
      searchParams.set("page", "1");
      setSearchParams(searchParams, { replace: true });
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
        value={size?.toString() || "10"}
        onChange={handleSizeChange}
      />
    </TableOperations>
  );
}

SetRowsPerPage.propTypes = {
  size: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default SetRowsPerPage;