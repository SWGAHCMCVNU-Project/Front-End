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

const ResourceNameText = styled.span`
  text-transform: uppercase;
  color: ${(props) =>
    props.color === "approve"
      ? "var(--color-green-600)"
      : props.color === "reject"
      ? "var(--color-red-700)"
      : "var(--color-green-600)"};
  font-weight: 600;
`;

function ConfirmUpdateState({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  color,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Cập nhật trạng thái</Heading>
      <p>
        Bạn có chắc chắn muốn{" "}
        <ResourceNameText color={color}>{resourceName}</ResourceNameText> sinh
        viên này không? Không thể hoàn tác hành động này.
      </p>

      <div>
        <Button
          $variations="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Hủy bỏ
        </Button>
        <Button $variations={color} disabled={disabled} onClick={onConfirm}>
          Tôi chắc chắn
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmUpdateState;
