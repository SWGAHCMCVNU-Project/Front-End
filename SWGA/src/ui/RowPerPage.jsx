import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function RowPerPage({ options, value, onLimitChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    const newLimit = e.target.value;
    searchParams.set("limit", newLimit);
    setSearchParams(searchParams);
    if (typeof onLimitChange === "function") {
      onLimitChange(newLimit);
    }
  }
  return (
    <Select
      options={options}
      type="white"
      value={value}
      onChange={handleChange}
    />
  );
}
