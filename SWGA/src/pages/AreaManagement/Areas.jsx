import styled from "styled-components";
import FilterOperations from "../../features/areas/FilterOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import AreaTable from "../../features/areas/AreaTable";
import AreaTableOperations from "../../features/areas/AreaTableOperations";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Areas() {
  return (
    <>
      <Container>
        <Heading as="h1">Khu vực</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <AreaTableOperations />
        </Row>
        <Row>
          <AreaTable />
        </Row>
      </Container>
    </>
  );
}

export default Areas;