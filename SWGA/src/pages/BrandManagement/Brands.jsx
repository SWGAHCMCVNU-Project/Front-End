import styled from "styled-components";
import FilterOperations from "../../features/brands/FilterOperations";
import BrandTable from "../../features/brands/BrandTable";
import BrandTableOperations from "../../features/brands/BrandTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Brands() {
  return (
    <>
      <Container>
        <Heading as="h1">Thương hiệu</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <BrandTableOperations />
        </Row>
        <Row>
          <BrandTable />
        </Row>
      </Container>
    </>
  );
}

export default Brands;
