import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 0.8rem 0.8rem 0.8rem 0;
`;

const Label = styled.div`
  display: flex;
  align-items: center;

  gap: 0.8rem;
  font-weight: 700;

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-brand-600);
  }
`;

const Value = styled.div`
  flex: 1;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      <Value>{children}</Value>
    </StyledDataItem>
  );
}

export default DataItem;
