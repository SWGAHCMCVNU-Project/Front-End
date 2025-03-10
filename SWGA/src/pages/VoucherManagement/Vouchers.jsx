import styled from "styled-components";
import VoucherTableOperations from "../../features/voucher/VoucherTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import VoucherTable from "../../features/voucher/VoucherTable";

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
        <Heading as="h1">Danh sách các phiếu ưu đãi của thương hiệu</Heading>
        <Row type="horizontal">
          <div></div>
          <VoucherTableOperations />
        </Row>
        <Row>
          <VoucherTable />
        </Row>
      </Container>
    </>
  );
}

export default Vouchers;
