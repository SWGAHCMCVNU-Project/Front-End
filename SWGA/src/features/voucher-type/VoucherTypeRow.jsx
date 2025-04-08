import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useEffect, useState, useRef } from "react";
import logoDefault from "../../assets/images/brand.png";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { handleValidImageURL } from "../../utils/helpers";
import { useUpdateVoucherType } from "../../hooks/voucher-type/useUpdateVoucherType";
import EditVoucherTypeForm from "./EditVoucherTypeForm";

const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
`;

const Img = styled.img`
  display: block;
  width: 50px;
  object-fit: cover;
  border-radius: 8px;
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

const StationName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function VoucherTypeRow({ id, typeName, image, description, state, displayedIndex, onUpdate }) {
  const [isValidImage, setIsValidImage] = useState(true);
  const { updateVoucherType, isLoading } = useUpdateVoucherType();
  const modalRef = useRef(null);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  const handleCloseModal = () => {
    // Thử nhiều selector khác nhau để tìm modal element
    let modalElement = document.querySelector(`[data-modal-window="edit-${id}"]`);
    if (!modalElement) {
      modalElement = document.querySelector(`#edit-${id}`);
    }
    if (!modalElement) {
      modalElement = document.querySelector(`[data-modal="edit-${id}"]`);
    }
    if (!modalElement) {
      modalElement = document.querySelector(`dialog[data-modal-window="edit-${id}"]`);
    }

    if (modalElement) {
      modalElement.close();
    } else {
      console.warn("Modal element not found for edit-", id);
      // Log tất cả dialog elements để debug
      const allDialogs = document.querySelectorAll("dialog");
    }

    // Fallback: Sử dụng ref nếu selector không tìm thấy
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <Table.Row>
      <StyledButton>
        <StationIndex>{displayedIndex}</StationIndex>
      </StyledButton>

      <StyledButton>
        <Station>
          <Img src={isValidImage ? image || logoDefault : logoDefault} />
          <StationName>{typeName}</StationName>
        </Station>
      </StyledButton>

      <Description>{description}</Description>

      <StyledButton>
        <Tag type={state ? "cyan" : "error"}>{state ? "Hoạt động" : "Không hoạt động"}</Tag>
      </StyledButton>

      <StyledAction>
        <Modal>
          <Modal.Open opens={`edit-${id}`}>
            <StyledButton>
              <HiPencil />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name={`edit-${id}`} ref={modalRef}>
            <EditVoucherTypeForm
              voucherTypeToEdit={{ id, typeName, image, description, state }}
              onSubmit={updateVoucherType}
              isLoading={isLoading}
              onClose={handleCloseModal}
              onSuccess={(updatedData) => {
                onUpdate(updatedData);
              }}
            />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens={`edit-${id}`}>
            <StyledButton>
              <HiTrash />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name={`delete-${id}`}>
            <ConfirmDelete resourceName="loại ưu đãi" />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

export default VoucherTypeRow;