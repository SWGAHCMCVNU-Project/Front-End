import styled from "styled-components";

const ButtonText = styled.button`
  color: var(--color-green-600);
  text-align: center;
  transition: all 0.3s;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  font-size: 1.5rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;

  &:hover,
  &:active {
    color: var(--color-brand-600);
  }
`;

export default ButtonText;
