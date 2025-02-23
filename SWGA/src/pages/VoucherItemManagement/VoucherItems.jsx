import styled from "styled-components";
import VoucherItemTableOperations from "../../features/voucher-items/VoucherItemTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import VoucherItemTable from "../../features/voucher-items/VoucherItemTable";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function VoucherItems() {
  return (
    <>
      <Container>
        <Heading as="h1">Danh sách các phiếu ưu đãi của thương hiệu</Heading>
        <Row type="horizontal">
          <div></div>
          <VoucherItemTableOperations />
        </Row>
        <Row>
          <VoucherItemTable />
        </Row>
      </Container>
    </>
  );
}

export default VoucherItems;
