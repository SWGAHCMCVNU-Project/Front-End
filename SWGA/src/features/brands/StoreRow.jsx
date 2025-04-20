import styled from "styled-components";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import {
  formatPhoneNumber,
  formattedHours,
  handleValidImageURL,
} from "../../utils/helpers";
import logoDefault from "../../assets/images/logo-slack.svg";

const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  gap: 0.5rem;
`;

const Img = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
`;

const StationName = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StyledCode = styled.div`
  color: var(--color-grey-500);
  font-size: 1.2rem;
  font-weight: 500;
`;

const Address = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const Contact = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const WorkingHours = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  span {
    &.open {
      color: #1c5d78;
    }
    &.close {
      color: var(--color-red-700);
    }
  }
`;

const StationIndex = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: #1c5d78;
  text-align: center;
`;

function StoreRow({ store, displayedIndex }) {
  const {
    storeName,
    areaName,
    address,
    phone,
    openingHours,
    closingHours,
    state,
    file, // Thêm avatar vào destructuring
  } = store;

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    if (file) {
      handleValidImageURL(file)
        .then((isValid) => setIsValidImage(isValid))
        .catch(() => setIsValidImage(false));
    } else {
      setIsValidImage(false); // Nếu không có avatar, dùng logoDefault
    }
  }, [file]);

  return (
    <Table.Row>
      <StationIndex>{displayedIndex}</StationIndex>
      <Station>
        <Img src={isValidImage && file ? file : logoDefault} />
        <div>
          <StationName>{storeName}</StationName>
          <StyledCode>Khu vực: {areaName}</StyledCode>
        </div>
      </Station>
      <Address>{address}</Address>
      <Contact>{formatPhoneNumber(phone)}</Contact>
      <WorkingHours>
        <div>
          Mở cửa: <span className="open">{formattedHours(openingHours)}</span>
        </div>
        <div>
          Đóng cửa:{" "}
          <span className="close">{formattedHours(closingHours)}</span>
        </div>
      </WorkingHours>
      <Tag type={state ? "cyan" : "error"}>
        {state ? "Hoạt động" : "Không Hoạt Động"}
      </Tag>
    </Table.Row>
  );
}

export default StoreRow;