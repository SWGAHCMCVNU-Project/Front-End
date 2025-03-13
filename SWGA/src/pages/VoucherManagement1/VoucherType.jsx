import styled from "styled-components";
import FilterOperations from "../../features/voucher-type/FilterOperations";
import VoucherTable from "../../features/voucher-type/VoucherTable";
import VoucherTableOperations from "../../features/voucher-type/VoucherTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import VoucherList from "../../features/voucher-type/VoucherList";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function VoucherType() {
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

export default VoucherType;
