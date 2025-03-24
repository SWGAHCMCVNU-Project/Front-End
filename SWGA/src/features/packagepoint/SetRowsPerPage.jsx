import PropTypes from "prop-types";
import TableOperations from "../../ui/TableOperations";

function SetRowsPerPage({ size, onChange }) {
  return (
    <TableOperations>
      <select
        value={size?.toString() || "10"}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="100">100</option>
      </select>
    </TableOperations>
  );
}

SetRowsPerPage.propTypes = {
  size: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default SetRowsPerPage;