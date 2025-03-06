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
// import { useDeleteVoucherItem } from "./useDeleteVoucherItem";

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
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StyledDate = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`;
const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
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

const StackedFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const StyledCode = styled.div`
  color: var(--color-grey-500);
  font-size: 1.2rem;
  font-weight: 500;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

const StyledNavigateButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

function VoucherItemRow({ voucher, displayedIndex }) {
  const { isDeleting, deleteVoucherItem } = useDeleteVoucherItem();
  const {
    id: voucherItemId,
    voucherImage,
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
    voucherCode,
    price,
    rate,
  } = voucher;

  const NavigateButton = ({ children }) => {
    const navigate = useNavigate();
    return (
      <StyledNavigateButton
        onClick={() => navigate(`/voucher-items/${voucherItemId}`)}
      >
        {children}
      </StyledNavigateButton>
    );
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(voucherImage)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [voucherImage]);

  return (
    <Table.Row>
      <NavigateButton>
        <StationIndex>{displayedIndex}</StationIndex>
      </NavigateButton>

      <NavigateButton>
        <Station>
          <Img src={isValidImage ? voucherImage || "" : logoDefault} />
          <StackedFrame>
            <StationName>{voucherName}</StationName>
            <StyledCode>Code: {voucherCode}</StyledCode>
          </StackedFrame>
        </Station>
      </NavigateButton>

      <NavigateButton>
        <StackedTime>
          <span>
            Giá ưu đãi:{" "}
            <StackedTimeFrameAbove>
              {price ? formatCurrency(price) : "Chưa xác định"}{" "}
              {price ? (
                <StyledImageBean src={greenBean} alt="dau xanh" />
              ) : null}
            </StackedTimeFrameAbove>
          </span>
          <span>
            Tỉ lệ chuyển đổi:{" "}
            <StackedTimeFrameBelow>
              {rate ? <span>x{rate} </span> : "Chưa xác định"}
            </StackedTimeFrameBelow>
          </span>
        </StackedTime>
      </NavigateButton>

      <NavigateButton>
        <StyledDate>
          <span>
            {format(addHours(new Date(dateCreated), 7), "dd MMM yyyy", {
              locale: vi,
            })}
          </span>
        </StyledDate>
      </NavigateButton>

      <StyledAction>
        <Modal>
          <Modal.Open opens="delete">
            <StyledButton>
              <HiTrash />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="phiếu ưu đãi"
              disabled={isDeleting}
              onConfirm={() => deleteVoucherItem(voucherItemId)}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

export default VoucherItemRow;
