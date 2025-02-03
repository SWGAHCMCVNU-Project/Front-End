import styled from "styled-components";

const Tag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-transform: capitalize;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.2rem;
  /* padding: 0.2rem 1.2rem; */
  border-radius: 5px;
  margin: 0 auto; /* Center horizontally */
  width: 120px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  border: 1px solid var(--color-${(props) => props.type}-600);
`;

export default Tag;
