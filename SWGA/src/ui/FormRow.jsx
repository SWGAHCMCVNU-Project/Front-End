import styled from "styled-components";
import { AiFillExclamationCircle } from "react-icons/ai";
import PropTypes from 'prop-types';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  /* grid-template-columns: 24rem 1fr 1.2fr; */
  grid-template-columns: 24rem 1.8fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-700);
  display: flex;
  background: none;
  border: none;
  gap: 0.5rem;
`;

const StyledIcon = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    transition: all 0.3s;
  }
`;

function FormRow({ label, error, children }) {
  // Kiểm tra an toàn khi truy cập id
  const childId = children?.props?.id || '';

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && (
        <Error>
          <StyledIcon>
            <AiFillExclamationCircle />
          </StyledIcon>
          {error}
        </Error>
      )}
    </StyledFormRow>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node
};

export default FormRow;
