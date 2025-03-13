import { AiFillExclamationCircle } from "react-icons/ai";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  gap: 1rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    /* border-bottom: 1px solid var(--color-grey-100); */
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
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

const StyleGreenWallet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const LeftFrame = styled.div`
  flex: 9;
`;

const RightFrame = styled.div`
  flex: 1;
  width: 100%;
`;

const StyledImageBean = styled.img`
  width: 30px;
  height: 30px;
`;

export default function FormRowUnit({ label, error, children, icon }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      <StyleGreenWallet>
        <LeftFrame>{children}</LeftFrame>
        <RightFrame>
          {icon && <StyledImageBean src={icon} alt="unit" />}
        </RightFrame>
      </StyleGreenWallet>

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
