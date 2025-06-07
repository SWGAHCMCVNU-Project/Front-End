/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../../ui/Button";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

const StyledContainer = styled.div`
  position: relative;
`;

const StyledFilterOptions = styled.div`
  position: absolute;
  top: 115%;
  left: 0;
  width: 200px;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
`;

function FilterOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
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
          if (selectedValue) {
            searchParams.set("state", selectedValue);
          } else {
            searchParams.delete("state");
          }
          setSearchParams(searchParams);
        }}
      />
    </TableOperations>
  );
}

export default FilterOperations;