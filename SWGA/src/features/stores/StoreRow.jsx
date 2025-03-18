import styled from "styled-components";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { useNavigate } from "react-router-dom";

import {
  formatPhoneNumber,
  formattedHours,
  handleValidImageURL,
} from "../../utils/helpers";
import logoDefault from "../../assets/images/logo-slack.svg";
import { useEffect, useState } from "react";
const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
  margin-left: ${(props) => (props.$isNullImage ? "2rem" : "0")};
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

  // If image is empty or null, use logoDefault
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StackedFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const StationName = styled.div`
  margin-left: ${(props) => (props.$isNullImage ? "0.5rem" : "0")};
  //show 1 line
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

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const StyledCode = styled.div`
  color: var(--color-grey-500);
  font-size: 1.4rem;
  font-weight: 600;
  //show 1 line
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const Address = styled.div`
  font-weight: 500;
  //show 1 line
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StyledNavigateButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

function StoreRow({ store, displayedIndex }) {
  const {
    id: storeId,
    avatar,
    openingHours,
    closingHours,
    storeName,
    state,
    address,
    areaName,
    email,
    phone,
  } = store;

  const NavigateButton = ({ children }) => {
    const navigate = useNavigate();
    return (
      <StyledNavigateButton onClick={() => navigate(`/stores/${storeId}`)}>
        {children}
      </StyledNavigateButton>
    );
  };

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(avatar)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [avatar]);

  return (
    <Table.Row>
      <NavigateButton>
        <StationIndex>{displayedIndex}</StationIndex>
      </NavigateButton>
      <NavigateButton>
        <Station $isNullImage={avatar === null}>
          {isValidImage ? <Img src={avatar || ""} /> : <Img src={logoDefault} />}
          <StackedFrame>
            <StationName $isNullImage={avatar === null}>{storeName}</StationName>
            <StyledCode>Khu vực: {areaName}</StyledCode>
          </StackedFrame>
        </Station>
      </NavigateButton>
      <NavigateButton>
        <Address>{address}</Address>
      </NavigateButton>
      <NavigateButton>
        <Stacked>
          <span>{email}</span>
          <span>{formatPhoneNumber(phone)}</span>
        </Stacked>
      </NavigateButton>
      <NavigateButton>
        <StackedTime>
          <span>
            Mở cửa: <StackedTimeFrameAbove>{formattedHours(openingHours)}</StackedTimeFrameAbove>
          </span>
          <span>
            Đóng cửa: <StackedTimeFrameBelow>{formattedHours(closingHours)}</StackedTimeFrameBelow>
          </span>
        </StackedTime>
      </NavigateButton>
      <NavigateButton>
        <Tag type={statusToTagName[state]}>{state ? "Hoạt động" : "Không hoạt động"}</Tag>
      </NavigateButton>
    </Table.Row>
  );
}

export default StoreRow;
