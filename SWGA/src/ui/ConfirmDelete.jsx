import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

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

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  const handleConfirm = async () => {
    await onConfirm();
    setTimeout(() => {
      onCloseModal();
    }, 1300);
  };
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Xóa {resourceName}</Heading>
      <p>
        Bạn có chắc chắn muốn xóa {resourceName} này vĩnh viễn không? Không thể
        hoàn tác hành động này.
      </p>

      <div>
        <Button
          $variations="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Hủy bỏ
        </Button>
        <Button
          $variations="danger"
          disabled={disabled}
          onClick={handleConfirm}
        >
          Tôi chắc chắn
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
