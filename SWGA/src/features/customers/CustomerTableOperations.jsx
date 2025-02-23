import styled from "styled-components";
import { HiPlus } from "react-icons/hi2";

const TableOperationsContainer = styled.div`
  margin: 20px 0;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-grey-200);
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--color-green-400);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: var(--color-green-400);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-green-500);
  }
`;

function CustomerTableOperations() {
  return (
    <TableOperationsContainer>
      <TopSection>
        <SearchSection>
          <SearchInput 
            type="text" 
            placeholder="Tìm kiếm khách hàng..." 
          />
        </SearchSection>

        <AddButton>
          <HiPlus />
          <span>Thêm khách hàng mới</span>
        </AddButton>
      </TopSection>
    </TableOperationsContainer>
  );
}

export default CustomerTableOperations; 