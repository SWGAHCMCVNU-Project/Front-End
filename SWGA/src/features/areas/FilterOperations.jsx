import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

export default function FilterOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="state"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "true", label: "Hoạt động" },
          { value: "false", label: "Không hoạt động" },
        ]}
      />
    </TableOperations>
  );
}
