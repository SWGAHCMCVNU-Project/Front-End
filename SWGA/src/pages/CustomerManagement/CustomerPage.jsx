import styled from "styled-components";
import CustomerTable from "../../features/customers/CustomerTable";
import CustomerFilterOperations from "../../features/customers/CustomerFilterOperations";
import CustomerTableOperations from "../../features/customers/CustomerTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function CustomerPage() {
  return (
    <>
      <Container>
        <Heading as="h1">Khách hàng</Heading>
        <Row type="horizontal">
          <CustomerFilterOperations />
          <CustomerTableOperations />
        </Row>
        <Row>
          <CustomerTable />
        </Row>
      </Container>
    </>
  );
}

export default CustomerPage;
