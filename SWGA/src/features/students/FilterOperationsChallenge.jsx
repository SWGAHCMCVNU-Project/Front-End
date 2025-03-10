import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function FilterOperationsChallenge() {
  return (
    <TableOperations>
      <Filter
        filterField="isCompleted"
        options={[
          { value: "", label: "Tất cả" },
          { value: "true", label: "Hoàn thành" },
          { value: "false", label: "Không hoàn thành" },
        ]}
      />
    </TableOperations>
  );
}

export default FilterOperationsChallenge;
