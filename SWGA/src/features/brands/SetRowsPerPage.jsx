import { useSearchParams } from "react-router-dom";
import RowPerPage from "../../ui/RowPerPage";
import TableOperations from "../../ui/TableOperations";
import PropTypes from "prop-types";

function BrandSetRowsPerPage({ pageSize, onLimitChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLimitChange = (newLimit) => {
    const numLimit = Number(newLimit);
    if (numLimit !== pageSize) {
      console.log("Changing pageSize to:", numLimit);
      onLimitChange(numLimit); // Gọi hàm từ component cha
      const params = new URLSearchParams(searchParams);
      params.set("size", newLimit);
      params.set("page", "1");
      setSearchParams(params, { replace: true });
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

BrandSetRowsPerPage.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default BrandSetRowsPerPage;