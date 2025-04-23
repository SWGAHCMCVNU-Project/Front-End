import styled from "styled-components";
import FilterOperations from "../../features/location/FilterOperations";
import LocationTable from "../../features/location/LocationTable";
import LocationTableOperations from "../../features/location/LocationTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Location() {
  return (
    <>
      <Container>
        <Heading as="h1">Danh sách các địa điểm</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <LocationTableOperations />
        </Row>
        <Row>
          <LocationTable />
        </Row>
      </Container>
    </>
  );
}

export default Location;