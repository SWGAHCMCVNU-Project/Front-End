import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useEffect, useState } from "react";
import logoDefault from "../../assets/images/brand.png";
import { formatCurrency, formattedHours, handleValidImageURL } from "../../utils/helpers";
import point from "../../assets/images/dauxanh.png";

const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
`;

const Img = styled.img`
  width: 50px;
  object-fit: cover;
  border-radius: 8px;
  padding: 0.5rem;
  margin-left: 2rem;
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StationName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.4rem; /* Khoảng cách giữa Tổng nhận và Tổng chi */
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
`;

const FinancialItem = styled.div`
  display: flex;
  align-items: center; /* Đảm bảo số và hình ảnh thẳng hàng */
  gap: 0.4rem; /* Khoảng cách giữa số và hình ảnh point */
  white-space: nowrap; /* Ngăn văn bản xuống dòng */
  margin-left: 75px;
`;

const PointIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
    border: 1px solid var(--color-green-600);
    border-radius: 5px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }

  & svg:hover {
    color: var(--color-green-600);
    transform: scale(1.1);
  }
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

function BrandRow({ brand, displayedIndex }) {
  const { id: brandId, openingHours, closingHours, brandName, state, totalIncome, totalSpending, coverPhoto } = brand;
  const navigate = useNavigate();
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(coverPhoto)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [coverPhoto]);

  return (
    <Table.Row>
      <div>{displayedIndex}</div>
      
      <div onClick={() => navigate(`/brands/${brandId}`)}>
        <Station>
          <Img src={isValidImage ? coverPhoto || "" : logoDefault} />
          <StationName>{brandName}</StationName>
        </Station>
      </div>

      <StackedTime>
        <span>
          Mở cửa: <StackedTimeFrameAbove>{openingHours ? formattedHours(openingHours) : "Chưa có dữ liệu"}</StackedTimeFrameAbove>
        </span>
        <span>
          Đóng cửa: <StackedTimeFrameBelow>{closingHours ? formattedHours(closingHours) : "Chưa có dữ liệu"}</StackedTimeFrameBelow>
        </span>
      </StackedTime>

      <StackedTime>
        <FinancialItem>
          Tổng nhận: <StackedTimeFrameAbove>{formatCurrency(totalIncome)}</StackedTimeFrameAbove>
          <PointIcon src={point} alt="point" />
        </FinancialItem>
        <FinancialItem>
          Tổng chi: <StackedTimeFrameBelow>{formatCurrency(totalSpending)}</StackedTimeFrameBelow>
          <PointIcon src={point} alt="point" />
        </FinancialItem>
      </StackedTime>

      <Tag type={state ? "cyan" : "error"}>{state ? "Hoạt động" : "Không hoạt động"}</Tag>

      <StyledAction />
    </Table.Row>
  );
}

export default BrandRow;