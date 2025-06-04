import { useEffect, useState } from "react";
import styled from "styled-components";
import greenBean from "../../../assets/images/dauxanh.png";
import logoDefault from "../../../assets/images/reading.png";
import { formatCurrency, handleValidImageURL } from "../../../utils/helpers";

// Hàm chuyển đổi số thứ hạng thành số thứ tự (1st, 2nd, 3rd, 4th, ...)
const getOrdinal = (number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = number % 100;
  const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  return `${number}${suffix}`;
};

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 7rem 5rem 1fr 9rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export const Flag = styled.img`
  width: ${(props) => (props.src ? "5rem" : "5rem")};
  height: ${(props) => (props.src ? "5rem" : "5rem")};
  border-radius: 50%;
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 5px;
`;

const RankContainer = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RankIcon = styled.i`
  font-size: 4rem;
  color: ${props =>
    props.rank === 1 ? "#FFD700" : // Vàng cho hạng 1
    props.rank === 2 ? "#C0C0C0" : // Bạc cho hạng 2
    props.rank === 3 ? "#CD7F32" : // Đồng cho hạng 3
    "#4A4A4A"}; // Xám cho hạng 4 trở lên
  position: absolute;
`;

const RankLabel = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1rem; /* Điều chỉnh kích thước chữ để nằm gọn */
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); /* Bóng chữ để nổi bật */
  z-index: 1; /* Đảm bảo số nằm trên cúp */
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

function DataItem({ activity }) {
  const { id, rank, name, image, value } = activity;
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  return (
    <StyledTodayItem>
      <RankContainer>
        <RankIcon className="fas fa-trophy" rank={rank} />
        <RankLabel>{getOrdinal(rank)}</RankLabel>
      </RankContainer>
      <Flag src={isValidImage ? image : logoDefault} alt={`Image of ${name}`} />
      <Guest>{name}</Guest>
      <StyleGreenWallet>
        {formatCurrency(value)}
        <StyledImageBean src={greenBean} alt="dau xanh" />
      </StyleGreenWallet>
    </StyledTodayItem>
  );
}

export default DataItem;