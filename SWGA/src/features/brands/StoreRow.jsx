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
  
  span {
    &.open {
      color: var(--color-green-700);
    }
    &.close {
      color: var(--color-red-700);
    }
  }
`;

const StationIndex = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-green-400);
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
    state
  } = store;

  return (
    <Table.Row>
      <StationIndex>{displayedIndex}</StationIndex>
      <Station>
        <Img src={logoDefault} />
        <div>
          <StationName>{storeName}</StationName>
          <StyledCode>Khu vực: {areaName}</StyledCode>
        </div>
      </Station>
      <Address>{address}</Address>
      <Contact>{formatPhoneNumber(phone)}</Contact>
      <WorkingHours>
        Mở cửa: <span className="open">{formattedHours(openingHours)}</span>
        <br />
        Đóng cửa: <span className="close">{formattedHours(closingHours)}</span>
      </WorkingHours>
      <Tag type={state ? "cyan" : "error"}>
        {state ? "Hoạt động" : "Không Hoạt Động"}
      </Tag>
    </Table.Row>
  );
}

export default StoreRow;
