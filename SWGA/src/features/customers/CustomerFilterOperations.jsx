import styled from "styled-components";

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: var(--color-grey-50);
  padding: 12px 16px;
  border-radius: 8px;
`;

const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusTabs = styled.div`
  display: flex;
  gap: 8px;
`;

const StatusTab = styled.button`
  padding: 8px 16px;
  border: 1px solid var(--color-grey-200);
  border-radius: 6px;
  background: ${props => props.active ? 'var(--color-green-400)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--color-grey-600)'};
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: var(--color-green-400);
    color: white;
  }
`;

const SpendingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 20px;
`;

const Label = styled.span`
  font-weight: 500;
  color: var(--color-grey-600);
  min-width: 80px;
`;

const SpendingSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid var(--color-grey-200);
  border-radius: 6px;
  min-width: 180px;
  background-color: white;
  color: var(--color-grey-600);

  &:focus {
    outline: none;
    border-color: var(--color-green-400);
  }
`;

function CustomerFilterOperations() {
  return (
    <FilterSection>
      <StatusGroup>
        <Label>Phân loại:</Label>
        <StatusTabs>
          <StatusTab active>Tất cả</StatusTab>
          <StatusTab>Thường xuyên</StatusTab>
          <StatusTab>Thỉnh thoảng</StatusTab>
          <StatusTab>Hiếm khi</StatusTab>
        </StatusTabs>
      </StatusGroup>

      <SpendingGroup>
        <Label>Chi tiêu:</Label>
        <SpendingSelect>
          <option value="">Tất cả mức chi tiêu</option>
          <option value="high">Trên 5.000.000đ</option>
          <option value="medium">1.000.000đ - 5.000.000đ</option>
          <option value="low">Dưới 1.000.000đ</option>
        </SpendingSelect>
      </SpendingGroup>
    </FilterSection>
  );
}

export default CustomerFilterOperations; 