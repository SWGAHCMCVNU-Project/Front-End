import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";

import { useEffect, useState } from "react";
import logoDefault from "../../../assets/images/brand.png";
import coverPhotoBrandDefault from "../../../assets/images/gallery.png";
import DataItem from "../../../ui/DataItem";
import Heading from "../../../ui/Heading";
import Tag from "../../../ui/Tag";
import { formatPhoneNumber, handleValidImageURL } from "../../../utils/helpers";
import DataItemDes from "./DataItemDes";
import useAccount from "../../../hooks/account/useAccount";

const StyledStationDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Infor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);
  margin-left: 10%;

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 3rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2rem;
  gap: 3rem;
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const Flag = styled.img`
  width: ${(props) => (props.src ? "40rem" : "40rem")};
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : coverPhotoBrandDefault)});
`;

const LogoBrand = styled.img`
  width: 8rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

function BrandDataBox({ brand }) {
  if (!brand) {
    return <div>No brand data available.</div>;
  }

  const {
    id = "",
    logo = "",
    coverPhoto = "",
    dateCreated = "",
    openingHours = "",
    closingHours = "",
    status = "",
    brandName = "Chưa cập nhật",
    state = false,
    description = "",
    address = "",
    numberOfFollowers = 0,
    accountId = "",
    acronym = "",
    coverFileName = "",
    link = "",
    dateUpdated = "",
  } = brand;

  const { account, loading: accountLoading, error: accountError } = useAccount(accountId);
  const email = account?.email ?? "Chưa cập nhật";
  const phone = account?.phone ?? "Chưa cập nhật";

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidCoverPhoto, setIsValidCoverPhoto] = useState(true);
  const [isValidLogo, setIsValidLogo] = useState(true);

  const formatTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
      return "Chưa cập nhật";
    }
    return timeStr.slice(0, 5);
  };

  // Validate cover photo and logo URLs
  useEffect(() => {
    handleValidImageURL(coverPhoto)
      .then((isValid) => setIsValidCoverPhoto(isValid))
      .catch(() => setIsValidCoverPhoto(false));
  }, [coverPhoto]);

  useEffect(() => {
    handleValidImageURL(logo)
      .then((isValid) => setIsValidLogo(isValid))
      .catch(() => setIsValidLogo(false));
  }, [logo]);

  if (accountLoading) {
    return <div>Loading data...</div>;
  }

  if (accountError) {
    console.error("Error fetching account details:", accountError);
  }

  return (
    <StyledStationDataBox>
      <Section>
        <Guest>
          <Flag
            src={isValidCoverPhoto ? coverPhoto || "" : ""}
            alt={`CoverPhoto of ${brandName}`}
          />

          <Infor>
            <HeadingGroup>
              <LogoBrand
                src={isValidLogo ? logo || "" : ""}
                alt={`Logo of ${brandName}`}
              />
              <Heading as="h1">{brandName}</Heading>
              <Tag type={statusToTagName[state]}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            </HeadingGroup>
            {address ? (
              <DataItem label="Địa chỉ:">{address}</DataItem>
            ) : (
              <DataItem label="Địa chỉ:">Chưa cập nhật</DataItem>
            )}

            {openingHours && closingHours ? (
              <DataItem label="Giờ mở cửa:">
                {formatTime(openingHours)} — {formatTime(closingHours)}
              </DataItem>
            ) : (
              <DataItem label="Giờ mở cửa:">Chưa cập nhật</DataItem>
            )}

            <DataItem label="Số người theo dõi:">
              {numberOfFollowers ?? "Chưa cập nhật"}
            </DataItem>

            {description ? (
              <DataItemDes label="Mô tả thương hiệu:">{description}</DataItemDes>
            ) : (
              <DataItem label="Mô tả:">Chưa cập nhật</DataItem>
            )}

            <DataItem label="Liên kết:">
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              ) : (
                "Chưa cập nhật"
              )}
            </DataItem>
          </Infor>
        </Guest>

        <Price>
          <DataItem icon={<HiOutlineEnvelope />} label="Gmail" value={email}>
            {email}
          </DataItem>
          <DataItem
            icon={<HiOutlinePhone />}
            label="Số điện thoại"
            value={phone ? formatPhoneNumber(phone) : "Chưa cập nhật"}
          >
            {phone ? formatPhoneNumber(phone) : "Chưa cập nhật"}
          </DataItem>
        </Price>
      </Section>

      <Footer>
        <p>
          Ngày tạo:{" "}
          {format(addHours(new Date(dateCreated), 7), "dd MMM yyyy, p", {
            locale: vi,
          })}
        </p>
        <p>
          Ngày cập nhật:{" "}
          {dateUpdated
            ? format(addHours(new Date(dateUpdated), 7), "dd MMM yyyy, p", {
                locale: vi,
              })
            : "Chưa cập nhật"}
        </p>
      </Footer>
    </StyledStationDataBox>
  );
}

export default BrandDataBox;