import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function FilterOperations() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("state") || "";

  return (
    <TableOperations>
      <Filter
        filterField="state"
        options={[
          { value: "", label: "Tất cả" },
          { value: "true", label: "Hoạt động" },
          { value: "false", label: "Không hoạt động" },
        ]}
        value={filterValue}
        onChange={(selectedValue) => {
          searchParams.set("filter", selectedValue);
        }}
      />
    </TableOperations>
  );
}

export default FilterOperations;