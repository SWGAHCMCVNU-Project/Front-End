import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useEffect, useState } from "react";
import logoDefault from "../../assets/images/brand.png";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { handleValidImageURL } from "../../utils/helpers";

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

function VoucherTypeRow({ id, typeName, image, description, state, displayedIndex }) {
  const navigate = useNavigate();
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  const handleEditClick = () => {
    navigate(`/voucher-types/edit/${id}`, {
      state: { voucherTypeToEdit: { id, typeName, image, description, state } },
    });
  };

  return (
    <Table.Row>
      <StyledButton onClick={() => navigate(`/voucher-types/${id}`)}>
        <StationIndex>{displayedIndex}</StationIndex>
      </StyledButton>

      <StyledButton onClick={() => navigate(`/voucher-types/${id}`)}>
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
        {/* <StyledButton onClick={() => navigate(`/voucher-types/${id}`)}>
          <HiEye />
        </StyledButton> */}

        <StyledButton onClick={handleEditClick}>
          <HiPencil />
        </StyledButton>

        <Modal>
          <Modal.Open opens="delete">
            <StyledButton>
              <HiTrash />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="loại ưu đãi" />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

export default VoucherTypeRow;
