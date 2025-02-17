import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Textarea from "../../ui/Textarea";
import FormRowReason from "./FormRowReason";

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

function ConfirmUpdateStateReason({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  color,
}) {
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const reasonParam = searchParams.get("reason");
    if (reasonParam) {
      setReason(reasonParam);
    }
  }, [searchParams]);

  const handleConfirm = () => {
    const trimmedReason = reason.trim();
    if (!trimmedReason) {
      setReasonError("Vui lòng nhập lí do.");
      return;
    }

    if (trimmedReason.length < 3 || trimmedReason.length > 200) {
      setReasonError("Lí do phải có từ 3 đến 200 ký tự.");
      return;
    }

    setReasonError("");

    setSearchParams(new URLSearchParams({ reason: trimmedReason }));

    onConfirm(trimmedReason);
  };

  const handleCloseModal = () => {
    setSearchParams(new URLSearchParams());
    onCloseModal();
  };

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Cập nhật trạng thái</Heading>
      <p>
        Bạn có chắc chắn muốn{" "}
        <ResourceNameText color={color}>{resourceName}</ResourceNameText> sinh
        viên này không? Không thể hoàn tác hành động này.
      </p>

      <FormRowReason label="" error={reasonError}>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lí do..."
        />
      </FormRowReason>

      <div>
        <Button
          $variations="secondary"
          disabled={disabled}
          onClick={handleCloseModal}
        >
          Hủy bỏ
        </Button>
        <Button $variations={color} disabled={disabled} onClick={handleConfirm}>
          Tôi chắc chắn
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmUpdateStateReason;
