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
import { useDeleteVoucher } from "./useDeleteVoucher";

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
  align-items: center;
  width: ${(props) => (props.src ? "50px" : "38px")};
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  margin-left: ${(props) => (props.src ? "2rem" : "0.5rem")};

  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StationName = styled.div`
  //show 1 line
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StyledButton = styled.button`
  text-align: left;
  background: none;
  border: none;
  padding: 0.6rem 0.6rem;
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
  gap: 0.3rem;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNavigateButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

function VoucherRow({ voucher, displayedIndex }) {
  const navigate = useNavigate();
  const { isDeleting, deleteVoucher } = useDeleteVoucher();
  const {
    id: voucherId,
    image,
    dateCreated,
    openingHours,
    closingHours,
    phone,
    status,
    typeName,
    voucherName,
    email,
    state,
    totalIncome,
    totalSpending,
    greenWalletImage,
    coverPhoto,
    logo,
  } = voucher;

  const NavigateButton = ({ children }) => {
    const navigate = useNavigate();
    return (
      <StyledNavigateButton onClick={() => navigate(`/vouchers/${voucherId}`)}>
        {children}
      </StyledNavigateButton>
    );
  };

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const handleEditClick = () => {
    navigate(`/vouchers/edit/${voucherId}`, {
      state: { voucherToEdit: voucher },
    });
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  return (
    <Table.Row>
      <NavigateButton>
        <StationIndex>{displayedIndex}</StationIndex>
      </NavigateButton>

      <NavigateButton>
        <Station isNullImage={image === null}>
          <Img src={isValidImage ? image || "" : logoDefault} />
          <StationName isNullImage={image === null}>{voucherName}</StationName>
        </Station>
      </NavigateButton>

      <NavigateButton>
        <Tag type={statusToTagName[state]}>
          {state ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      </NavigateButton>

      <StyledAction>
        <StyledButton onClick={() => navigate(`/vouchers/${voucherId}`)}>
          <HiEye />
        </StyledButton>

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
            <ConfirmDelete
              resourceName="voucher"
              disabled={isDeleting}
              onConfirm={() => deleteVoucher(voucherId)}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

export default VoucherRow;
