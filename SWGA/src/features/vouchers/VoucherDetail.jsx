import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { HiPencil } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import VoucherDataBox from "./VoucherDataBox";
import { useVoucher } from "../../hooks/voucher/useVoucher";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

function VoucherDetail() {
  const navigate = useNavigate();
  const { voucherId } = useParams();
  const { voucher, isLoading } = useVoucher();

  // Log voucher trong VoucherDetail

  if (isLoading) return <Spinner />;
  if (!voucher) return <div>Không có dữ liệu ưu đãi. Vui lòng kiểm tra voucher ID hoặc API.</div>;

  const handleEditClick = () => {
    navigate(`/vouchers/edit/${voucher.id}`, { state: { voucherToEdit: voucher } });
  };

  return (
    <Container>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Thông tin ưu đãi</Heading>
        </HeadingGroup>
      </Row>
      <ButtonGroup>
        <ButtonText onClick={() => navigate(`/vouchers`)}>← Quay lại</ButtonText>
        <ButtonGroup>
          <Button $variations="primary" onClick={handleEditClick}>
            <StyledContainerButton>
              <StyledButton>
                <HiPencil />
              </StyledButton>
              Chỉnh sửa
            </StyledContainerButton>
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      <VoucherDataBox voucher={voucher} />
    </Container>
  );
}

export default VoucherDetail;