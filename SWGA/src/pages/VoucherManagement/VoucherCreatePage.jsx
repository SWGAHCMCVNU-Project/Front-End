import Row from "../../ui/Row";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import VoucherCreateBox from "../../features/vouchers/VoucherCreateBox"
import { useLocation } from "react-router-dom";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
`;

export default function VoucherCreatePage() {
  const location = useLocation();
  const voucherToEdit = location.state ? location.state.voucherToEdit : {};
  return (
    <Container>
      <Row type="horizontal">
        {voucherToEdit.id ? (
          <HeadingGroup>
            <Heading as="h1">Cập nhật ưu đãi</Heading>
          </HeadingGroup>
        ) : (
          <HeadingGroup>
            <Heading as="h1">Thêm ưu đãi</Heading>
          </HeadingGroup>
        )}
      </Row>
      <VoucherCreateBox voucherToEdit={voucherToEdit} />
    </Container>
  );
}
