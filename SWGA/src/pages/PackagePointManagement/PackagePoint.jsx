import styled from "styled-components";
import FilterOperations from "../../features/packagepoint/FilterOperations";
import PackageTable from "../../features/packagepoint/PackageTable";
import PackageTableOperations from "../../features/packagepoint/PackageTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function PackagePoint() {
  return (
    <>
      <Container>
        <Heading as="h1">Danh sách các gói điểm</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <PackageTableOperations />
        </Row>
        <Row>
          <PackageTable />
        </Row>
      </Container>
    </>
  );
}

export default PackagePoint;
