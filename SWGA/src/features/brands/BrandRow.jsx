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
  flex-direction: column; /* Xếp chồng hình ảnh và tên thương hiệu theo chiều dọc */
  align-items: center; /* Căn giữa theo chiều ngang */
  justify-content: center; /* Căn giữa theo chiều dọc */
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
  width: 100%; /* Đảm bảo chiếm toàn bộ chiều rộng của cột */
`;

const Img = styled.img`
  width: 50px;
  object-fit: cover;
  border-radius: 8px;
  padding: 0.5rem;
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StationName = styled.div`
  max-width: 200px;
  text-align: center; /* Căn giữa văn bản */
  white-space: normal; /* Cho phép xuống dòng */
  word-wrap: break-word; /* Đảm bảo từ dài được ngắt dòng */
`;

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center; /* Căn giữa nội dung */
  font-weight: 500;
  gap: 0.4rem;
`;

const FinancialItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const PointIcon = styled.img`
  width: 16px;
  height: 16px;
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
          Mở cửa: <span style={{ color: "#1c5d78" }}>{openingHours ? formattedHours(openingHours) : "Chưa có dữ liệu"}</span>
        </span>
        <span>
          Đóng cửa: <span style={{ color: "red" }}>{closingHours ? formattedHours(closingHours) : "Chưa có dữ liệu"}</span>
        </span>
      </StackedTime>

      <StackedTime>
        {/* <FinancialItem>
          Tổng nhận: <span style={{ color: "#1c5d78" }}>{formatCurrency(totalIncome)}</span>
          <PointIcon src={point} alt="point" />
        </FinancialItem> */}
        <FinancialItem>
          Tổng chi: <span style={{ color: "red" }}>{formatCurrency(totalSpending)}</span>
          <PointIcon src={point} alt="point" />
        </FinancialItem>
      </StackedTime>

      <Tag type={state ? "cyan" : "error"}>{state ? "Hoạt động" : "Không hoạt động"}</Tag>

      <StyledAction />
    </Table.Row>
  );
}

export default BrandRow;