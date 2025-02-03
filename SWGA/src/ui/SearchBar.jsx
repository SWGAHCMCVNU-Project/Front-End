import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem 0.8rem 3rem;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  width: 280px;

  &:focus {
    outline: 1px solid var(--color-green-400);
    outline-offset: -1px;
  }
`;

const SearchIcon = styled(IoIosSearch)`
  position: absolute;
  top: 50%;
  left: 0.8rem;
  transform: translateY(-50%);
  color: var(--color-grey-900);
`;

export default function SearchBar({ onChange, placeholder }) {
  return (
    <InputContainer>
      <Input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <SearchIcon size={20} />
    </InputContainer>
  );
}
