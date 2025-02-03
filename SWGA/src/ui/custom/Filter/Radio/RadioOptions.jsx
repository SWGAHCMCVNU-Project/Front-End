import React from 'react';
import styled, { css } from 'styled-components';

export const StyledFilterRadio = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

export const FilterButtonRadio = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  ${(props) =>
        props.$active &&
        css`
      background-color: var(--color-green-400);
      color: var(--color-grey-0);
    `}

  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-green-400);
    color: var(--color-grey-0);
  }
`;

export const StateOptions = ({ state, onChange }) => {
    const optionStates = [
        { value: "", label: "Tất cả" },
        { value: "true", label: "Hoạt động" },
        { value: "false", label: "Không hoạt động" },
    ];

    const currentFilter = state || optionStates.at(0)?.value;

    const handleChangeState = (selectedOptionState) => {
        onChange(selectedOptionState);
    };

    return (
        <StyledFilterRadio>
            {optionStates.map((option) => (
                <FilterButtonRadio
                    key={option.value}
                    onClick={() => handleChangeState(option.value)}
                    $active={option.value === currentFilter}
                    disabled={option.value === currentFilter}
                >
                    {option.label}
                </FilterButtonRadio>
            ))}
        </StyledFilterRadio>
    );
}
