import styled from "styled-components";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const StackedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  cursor: pointer;
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2.2rem;
    height: 1.8rem;
    transition: all 0.3s;
  }
`;

const StackedArrowDropup = styled(IoMdArrowDropup)`
  margin-bottom: -0.7rem;
  color: ${(props) =>
    props.$active && props.$ascending
      ? "var(--color-green-400)"
      : "var(--color-grey-400)"};
`;

const StackedArrowDropdown = styled(IoMdArrowDropdown)`
  margin-top: -0.2rem;
  color: ${(props) =>
    props.$active && !props.$ascending
      ? "var(--color-green-400)"
      : "var(--color-grey-400)"};
`;

const StackedHeader = ({ label, onClick, ascending, active }) => {
  return (
    <StackedContainer onClick={onClick}>
      <div>{label}</div>
      <StyledButton>
        <StackedArrowDropup $ascending={ascending} $active={active} />
        <StackedArrowDropdown $ascending={ascending} $active={active} />
      </StyledButton>
    </StackedContainer>
  );
};

export default StackedHeader;
