import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useEffect, useState } from "react";
import logoDefault from "../../assets/images/brand.png";
import { formattedHours, handleValidImageURL } from "../../utils/helpers";

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

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
  gap: 0.3rem;
`;

function WishlistRow({ brand, index }) {
  const {
    id: brandId,
    openingHours,
    closingHours,
    brandName,
    state,
    totalIncome,
    totalSpending,
    logo,
  } = brand;
  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(logo)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [logo]);

  return (
    <Table.Row>
      <StationIndex>{index}</StationIndex>
      <Station>
        <Img src={isValidImage ? logo || "" : logoDefault} />
        <StationName>{brandName}</StationName>
      </Station>

      <StackedTime>
        <span>
          Mở cửa:{" "}
          <StackedTimeFrameAbove>
            {openingHours ? formattedHours(openingHours) : "Chưa cập nhật"}
          </StackedTimeFrameAbove>
        </span>
        <span>
          Đóng cửa:{" "}
          <StackedTimeFrameBelow>
            {closingHours ? formattedHours(closingHours) : "Chưa cập nhật"}
          </StackedTimeFrameBelow>
        </span>
      </StackedTime>

      <StackedTime>
        <span>
          Tổng nhận:{" "}
          <StackedTimeFrameAbove>{totalIncome}</StackedTimeFrameAbove>
        </span>
        <span>
          Tổng chi:{" "}
          <StackedTimeFrameBelow>{totalSpending}</StackedTimeFrameBelow>
        </span>
      </StackedTime>

      <Tag type={statusToTagName[state]}>
        {state ? "Hoạt động" : "Không hoạt động"}
      </Tag>
    </Table.Row>
  );
}

export default WishlistRow;
