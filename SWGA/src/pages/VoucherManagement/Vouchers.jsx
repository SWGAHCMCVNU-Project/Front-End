import styled from "styled-components";
import FilterOperations from "../../features/vouchers/FilterOperations";
import VoucherTable from "../../features/vouchers/VoucherTable";
import VoucherTableOperations from "../../features/vouchers/VoucherTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import VoucherList from "../../features/vouchers/VoucherList";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Vouchers() {
  return (
    <>
      <Container>
        <Heading as="h1">Danh sách các ưu đãi của thương hiệu</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <VoucherTableOperations />
        </Row>
        <Row>
          <VoucherList />
        </Row>
      </Container>
    </>
  );
}

export default Vouchers;
