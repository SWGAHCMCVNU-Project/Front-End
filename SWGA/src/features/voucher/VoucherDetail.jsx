import { HiTrash } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
// import ConfirmDelete from "../../ui/ConfirmDelete";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
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
  const { campaignId } = useParams();
  const { voucher, isLoading } = useVoucher();
  // const { isDeleting, deleteVoucherItem } = useDeleteVoucherItem();

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Thông tin phiếu ưu đãi</Heading>
        </HeadingGroup>
      </Row>

      <ButtonGroup>
        {campaignId ? (
          <ButtonText onClick={() => navigate(`/campaigns/${campaignId}`)}>
            &larr; Quay lại
          </ButtonText>
        ) : (
          <>
            <ButtonText onClick={() => navigate(`/voucher-items`)}>
              &larr; Quay lại
            </ButtonText>

            <ButtonGroup>
              <Modal>
                <Modal.Open opens="delete">
                  <Button $variations="danger">
                    <StyledContainerButton>
                      <StyledButton>
                        <HiTrash />
                      </StyledButton>
                      Xóa ưu đãi
                    </StyledContainerButton>
                  </Button>
                </Modal.Open>
                {/* <Modal.Window name="delete">
                  <ConfirmDelete
                    resourceName="phiếu ưu đãi"
                    disabled={isDeleting}
                    onConfirm={() => deleteVoucherItem(voucherItemId)}
                  />
                </Modal.Window> */}
              </Modal>
            </ButtonGroup>
          </>
        )}
      </ButtonGroup>

      <VoucherDataBox voucher={voucher} />
    </Container>
  );
}

export default VoucherDetail;
