import { Select } from "antd";
import { forwardRef, useState } from "react";
import styled from "styled-components";
import "./SelectForm.scss";

export const FormSelect = styled(Select)`
  .ant-select-selection-placeholder {
    flex: 1;
    overflow: hidden;
    color: #374151;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
    font-weight: 400;
    text-align: left;
  }
`;

const { Option } = Select;

export const SelectForm = forwardRef(
  ({ options, value, onChange, disabled, inModal }, ref) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const handleSelectChange = (selectedOption) => {
      setSelectedValue(selectedOption);
      onChange(selectedOption);
    };

    return (
      <FormSelect
        ref={ref}
        className={inModal === true ? "update-modal-form" : ""}
        value={selectedValue}
        onChange={handleSelectChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <Option value={option.value} key={option.value}>
            {option.label}
          </Option>
        ))}
      </FormSelect>
    );
  }
);

export const SelectFormState = forwardRef(
  ({ options, value, onChange, disabled }, ref) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const handleSelectChange = (selectedOption) => {
      setSelectedValue(selectedOption);
      onChange(selectedOption);
    };

    return (
      <FormSelect
        ref={ref}
        className={
          value === "Hoạt động"
            ? "active-select-state"
            : "inactive-select-state"
        }
        value={selectedValue}
        onChange={handleSelectChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <Option value={option.value} key={option.value}>
            {option.label}
          </Option>
        ))}
      </FormSelect>
    );
  }
);
