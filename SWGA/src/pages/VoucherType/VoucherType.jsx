import styled from "styled-components";
import FilterOperations from "../../features/voucher-type/FilterOperations";
import VoucherTypeTable from "../../features/voucher-type/VoucherTypeTable";
import VoucherTypeTableOperations from "../../features/voucher-type/VoucherTypeTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import VoucherTypeList from "../../features/voucher-type/VoucherTypeList";

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
        <Heading as="h1">Danh sách các thể loại của phiếu</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <VoucherTypeTableOperations />
        </Row>
        <Row>
          <VoucherTypeTable />
        </Row>
      </Container>
    </>
  );
}

export default VoucherType;
