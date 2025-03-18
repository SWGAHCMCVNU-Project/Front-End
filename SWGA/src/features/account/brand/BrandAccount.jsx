import styled from "styled-components";
import Button from "../../../ui/Button";
import ButtonGroup from "../../../ui/ButtonGroup";
import Heading from "../../../ui/Heading";
import Row from "../../../ui/Row";
import AccountDataBox from "./AccountDataBox";
import { HiPencil } from "react-icons/hi2";
import { useMoveBack } from "../../../hooks/useMoveBack";
import Modal from "../../../ui/Modal";
import Spinner from "../../../ui/Spinner";
import EditAccountForm from "./EditAccountForm";
import useAccount from "../../../hooks/account/useAccount";

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

function BrandAccount({ accountId }) {
  const { account, isLoading, refetch } = useAccount(accountId);

  if (isLoading) return <Spinner />;
  if (!account) return <div>Không tìm thấy dữ liệu tài khoản.</div>;

  return (
    <Container>
      <ButtonGroup>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Thông tin tài khoản</Heading>
          </HeadingGroup>
        </Row>

        <Modal>
          <Modal.Open opens="edit">
            <Button $variations="primary">
              <StyledContainerButton>
                <StyledButton>
                  <HiPencil />
                </StyledButton>
                Chỉnh sửa
              </StyledContainerButton>
            </Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <EditAccountForm accountToEdit={account} onCloseModal={refetch} />
          </Modal.Window>
        </Modal>
      </ButtonGroup>

      <AccountDataBox account={account} />
    </Container>
  );
}

export default BrandAccount;