import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/brand.png";
import greenBean from "../../assets/images/dauxanh.png";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency, handleValidImageURL } from "../../utils/helpers";
import PropTypes from "prop-types";

const VoucherName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Img = styled.img`
  display: block;
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 4px;
`;

const VoucherType = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Rate = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-red-700);
`;

const Status = styled.div`
  width: fit-content;
  padding: 0.4rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: ${(props) => 
    props.$status ? "var(--color-green-100)" : "var(--color-red-100)"};
  color: ${(props) => 
    props.$status ? "var(--color-green-700)" : "var(--color-red-700)"};
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-red-700);
  }
`;

function VoucherRow({ voucher }) {
  const navigate = useNavigate();
  const [isValidImage, setIsValidImage] = useState(true);
  const isDeleting = false;

  const {
    id: voucherId,
    image,
    dateCreated,
    voucherName,
    price,
    rate,
    typeName,
    state
  } = voucher;

  useEffect(() => {
    if (image) {
      handleValidImageURL(image)
        .then((isValid) => setIsValidImage(isValid))
        .catch(() => setIsValidImage(false));
    } else {
      setIsValidImage(false);
    }
  }, [image]);

  const handleRowClick = () => {
    navigate(`/vouchers/${voucherId}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("Delete voucher:", voucherId);
  };

  return (
    <Table.Row onClick={handleRowClick} role="button" style={{ cursor: "pointer" }}>
      <VoucherName>{voucherName}</VoucherName>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Img src={isValidImage ? image : logoDefault} alt={voucherName} />
      </div>

      <VoucherType>{typeName}</VoucherType>

      <Price>
        {formatCurrency(price)}
        <img src={greenBean} alt="Green Bean" style={{ width: "20px", height: "20px" }} />
      </Price>

      <Rate>x{rate}</Rate>

      <div>
        {format(addHours(new Date(dateCreated), 7), "dd MMM yyyy", {
          locale: vi,
        })}
      </div>

      <Status $status={state}>
        {state ? "Hoạt động" : "Không hoạt động"}
      </Status>

      <StyledAction onClick={(e) => e.stopPropagation()}>
        <Modal>
          <Modal.Open opens="delete">
            <DeleteButton>
              <HiTrash />
            </DeleteButton>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="phiếu ưu đãi"
              disabled={isDeleting}
              onConfirm={handleDelete}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

VoucherRow.propTypes = {
  voucher: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    dateCreated: PropTypes.string,
    voucherName: PropTypes.string,
    price: PropTypes.number,
    rate: PropTypes.number,
    typeName: PropTypes.string,
    state: PropTypes.bool
  }).isRequired
};

export default VoucherRow;
