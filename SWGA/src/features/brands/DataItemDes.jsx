import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 0.8rem 0;
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

function DataItemDes({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      <div style={{ flex: 1 }}>{children}</div>
    </StyledDataItem>
  );
}

export default DataItemDes;
