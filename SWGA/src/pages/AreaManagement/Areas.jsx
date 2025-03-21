import styled from "styled-components";
import Heading from "../../ui/Heading";
import AreaTable from "../../features/areas/AreaTable";

const Container = styled.div`
  padding: 2.4rem 4rem;
`;

const StyledHeading = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  margin-bottom: 2.4rem;
`;

function Areas() {
  return (
    <Container>
      <StyledHeading>Khu vực</StyledHeading>
      <AreaTable />
    </Container>
  );
}

export default Areas;
