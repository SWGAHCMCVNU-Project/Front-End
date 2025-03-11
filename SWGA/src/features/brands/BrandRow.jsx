import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useEffect, useState } from "react";
import logoDefault from "../../assets/images/brand.png";
import Modal from "../../ui/Modal";
import BrandDetailModal from "./BrandDetailModal";
import { formatCurrency, formattedHours, handleValidImageURL } from "../../utils/helpers";

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
  white-space: nowrap; /* Không cắt chữ */
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; /* Tăng giới hạn */
`;

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: 500;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
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
    color: var(--color-grey-600); /* Làm đậm */
  }

  & svg:hover {
    color: var(--color-green-600);
    transform: scale(1.1); /* Phóng to nhẹ */
  }
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

function BrandRow({ brand, displayedIndex }) {
  const { id: brandId, openingHours, closingHours, brandName, state, totalIncome, totalSpending, logo } = brand;
  const navigate = useNavigate();
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(logo)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [logo]);

  return (
    <Table.Row>
      <div>{displayedIndex}</div> {/* Hiển thị số thứ tự */}
      
      <div onClick={() => navigate(`/brands/${brandId}`)}>
        <Station>
          <Img src={isValidImage ? logo || "" : logoDefault} />
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
        <span>
          Tổng nhận: <StackedTimeFrameAbove>{formatCurrency(totalIncome)}</StackedTimeFrameAbove>
        </span>
        <span>
          Tổng chi: <StackedTimeFrameBelow>{formatCurrency(totalSpending)}</StackedTimeFrameBelow>
        </span>
      </StackedTime>

      <Tag type={state ? "cyan" : "error"}>{state ? "Hoạt động" : "Không hoạt động"}</Tag>

      <StyledAction>
        <Modal>
          {/* <Modal.Open opens="view">
            <StyledButton>
              <HiEye />
            </StyledButton>
          </Modal.Open> */}
          {/* <Modal.Window name="view">
            <BrandDetailModal brand={brand} />
          </Modal.Window> */}
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

export default BrandRow;
