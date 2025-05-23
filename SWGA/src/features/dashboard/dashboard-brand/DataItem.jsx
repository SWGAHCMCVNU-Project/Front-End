import { useEffect, useState } from "react";
import styled from "styled-components";
import greenBean from "../../../assets/images/dauxanh.png";
import logoDefault from "../../../assets/images/reading.png";
import star from "../../../assets/images/star.png";
import { formatCurrency, handleValidImageURL } from "../../../utils/helpers";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 8rem 7rem 3fr 30rem; /* Tăng kích thước cột: ngôi sao, ảnh, tên, giá trị */
  gap: 1.6rem; /* Tăng khoảng cách giữa các cột */
  align-items: center;
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem; /* Tăng padding để ô rộng hơn */
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export const Flag = styled.img`
  width: ${(props) => (props.src ? "6rem" : "6rem")}; /* Tăng kích thước ảnh */
  height: ${(props) => (props.src ? "6rem" : "6rem")};
  border-radius: 50%;
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 8px; /* Tăng khoảng cách giữa giá trị và icon */
`;

const StarImage = styled.div`
  width: 5rem; /* Tăng kích thước ngôi sao */
  height: 5rem;
  position: relative;
`;

const StarIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const RankLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem; /* Tăng cỡ chữ số thứ hạng */
  font-weight: bold;
  color: white;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  font-weight: bold;
  font-size: 16px;
  text-align: end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
      <StarImage>
        <StarIcon src={star} alt="Star" />
        <RankLabel>{rank}</RankLabel>
      </StarImage>
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