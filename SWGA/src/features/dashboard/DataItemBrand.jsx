/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import logoDefault from "../../assets/images/brand.png";
import greenBean from "../../assets/images/dauxanh.png";
import star from "../../assets/images/star.png";
import { formatCurrency, handleValidImageURL } from "../../utils/helpers";

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
  border-radius: var(--border-radius-lg);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 5px; /* Add some spacing between the value and the image */
`;

const StarImage = styled.div`
  width: 4rem;
  height: 4rem;
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
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  font-weight: bold;
  font-size: 16px;
  text-align: end;
  display: flex; /* Use flexbox to align items */
  align-items: center; /* Center items vertically */
  justify-content: flex-end; /* Align to the right */
`;

function DataItemBrand({ activity }) {
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

export default DataItemBrand;