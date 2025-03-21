import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";

import { useEffect, useState } from "react";
import logoDefault from "../../../assets/images/brand.png";
import greenBean from "../../../assets/images/dauxanh.png";
import coverPhotoBrandDefault from "../../../assets/images/gallery.png";
import DataItem from "../../../ui/DataItem";
import Heading from "../../../ui/Heading";
import Tag from "../../../ui/Tag";
import {
  formatCurrency,
  formatPhoneNumber,
  handleValidImageURL,
} from "../../../utils/helpers";
import DataItemDes from "./DataItemDes";
import useAccount from "../../../hooks/account/useAccount"; // Import the useAccount hook

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
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  gap: 5rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

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

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
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

const StyledTotalBean = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const LogoBrand = styled.img`
  width: 8rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

function BrandDataBox({ brand }) {
  // Add a safeguard in case brand is null or undefined
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
    greenWalletName = "",
    greenWalletBalance = 0,
    totalIncome = 0,
    totalSpending = 0,
    accountId = "",
    acronym = "",
    coverFileName = "",
    link = "",
    dateUpdated = "",
  } = brand;

  // Fetch account details using the accountId from the brand
  const { account, loading: accountLoading, error: accountError } = useAccount(accountId);

  // Use email and phone from the account data if available, otherwise fall back to defaults
  const email = account?.email ?? "Chưa cập nhật";
  const phone = account?.phone ?? "Chưa cập nhật";

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidCoverPhoto, setIsValidCoverPhoto] = useState(true);
  const [isValidLogo, setIsValidLogo] = useState(true);

  // Hàm định dạng giờ từ chuỗi "HH:mm:ss" thành "HH:mm"
  const formatTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
      return "Chưa cập nhật";
    }
    return timeStr.slice(0, 5); // Lấy "HH:mm" từ "HH:mm:ss"
  };

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

  // Log đầy đủ dữ liệu của brand, bao gồm cả email và phone từ account
  useEffect(() => {
    console.log("Full Brand Data:", {
      id,
      accountId,
      brandName,
      acronym,
      address,
      coverPhoto: {
        url: coverPhoto ?? "Chưa có ảnh bìa",
        fileName: coverFileName ?? "N/A",
        isValid: isValidCoverPhoto,
      },
      link,
      openingHours,
      closingHours,
      totalIncome: totalIncome ?? "N/A",
      totalSpending: totalSpending ?? "N/A",
      dateCreated,
      dateUpdated: dateUpdated ?? "Chưa cập nhật",
      description,
      state,
      status,
      phone, // Use the phone from account
      email, // Use the email from account
      numberOfFollowers: numberOfFollowers ?? "Chưa cập nhật",
      greenWalletName: greenWalletName ?? "Chưa cập nhật",
      greenWalletBalance: greenWalletBalance ?? "Chưa cập nhật",
      accountData: account, // Log the full account data for debugging
      accountLoading,
      accountError,
    });
  }, [
    id,
    accountId,
    brandName,
    acronym,
    address,
    coverPhoto,
    coverFileName,
    link,
    openingHours,
    closingHours,
    totalIncome,
    totalSpending,
    dateCreated,
    dateUpdated,
    description,
    state,
    status,
    phone,
    email,
    numberOfFollowers,
    greenWalletName,
    greenWalletBalance,
    isValidCoverPhoto,
    account, // Add account as a dependency to re-log when account data changes
    accountLoading,
    accountError,
  ]);

  // Show a loading state while fetching account data
  if (accountLoading) {
    return <div>Loading account details...</div>;
  }

  // Show an error if fetching account data fails
  if (accountError) {
    console.error("Error fetching account details:", accountError);
    // You can choose to render the component with default values or show an error
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

            <DataItem label={`${greenWalletName || "Ví xanh"}:`}>
              <StyleGreenWallet>
                {formatCurrency(greenWalletBalance ?? 0)}{" "}
                <StyledImageBean src={greenBean} alt="dau xanh" />
              </StyleGreenWallet>
            </DataItem>

            <StyledTotalBean>
              <DataItem label="Tổng nhận:">
                <StyleGreenWallet>
                  {formatCurrency(totalIncome ?? 0)}{" "}
                  <StyledImageBean src={greenBean} alt="dau xanh" />
                </StyleGreenWallet>
              </DataItem>
              |
              <DataItem label="Tổng chi:">
                <StyleGreenWallet>
                  {formatCurrency(totalSpending ?? 0)}{" "}
                  <StyledImageBean src={greenBean} alt="dau xanh" />
                </StyleGreenWallet>
              </DataItem>
            </StyledTotalBean>

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
          <DataItem
            icon={<HiOutlineEnvelope />}
            label="Gmail"
            value={email}
          >
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