import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { HiEye, HiPencil } from "react-icons/hi2";
import logoDefault from "../../assets/images/brand.png";
import { useEffect, useState } from "react";

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

function VoucherRow({ voucher, displayedIndex }) {
  const navigate = useNavigate();
  const { id: voucherId, image, voucherName, state } = voucher;

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(image);
        setIsValidImage(response.ok);
      } catch {
        setIsValidImage(false);
      }
    };
    if (image) checkImage();
  }, [image]);

  return (
    <Table.Row>
      <StationIndex>{displayedIndex}</StationIndex>
      <Station>
        <Img src={isValidImage ? image : logoDefault} alt={voucherName} />
        <StationName>{voucherName}</StationName>
      </Station>
      <Tag type={statusToTagName[state]}>{state ? "Hoạt động" : "Không hoạt động"}</Tag>
      <StyledAction>
        <StyledButton onClick={() => navigate(`/vouchers/${voucherId}`)}>
          <HiEye />
        </StyledButton>
        <StyledButton onClick={() => navigate(`/vouchers/edit/${voucherId}`, { state: { voucherToEdit: voucher } })}>
          <HiPencil />
        </StyledButton>
      </StyledAction>
    </Table.Row>
  );
}

export default VoucherRow;