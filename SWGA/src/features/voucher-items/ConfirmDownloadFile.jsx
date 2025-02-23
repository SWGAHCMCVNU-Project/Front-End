import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDownloadFile({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Tải tệp {resourceName}</Heading>
      <p>
        Bạn có muốn tải tệp {resourceName} này không? Không thể hoàn tác hành
        động này.
      </p>

      <div>
        <Button
          $variations="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Hủy bỏ
        </Button>
        <Button $variations="danger" disabled={disabled} onClick={onConfirm}>
          Tệp kết quả
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDownloadFile;
