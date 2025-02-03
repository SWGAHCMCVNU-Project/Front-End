import styled from "styled-components";

const StyledEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function Empty({ resourceName }) {
  return <StyledEmpty>Không tìm thấy {resourceName} nào.</StyledEmpty>;
}

export default Empty;
