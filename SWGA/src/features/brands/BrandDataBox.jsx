import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";
import { useEffect, useState } from "react";
import logoDefault from "../../assets/images/brand.png";
import greenBean from "../../assets/images/dauxanh.png";
import coverPhotoBrandDefault from "../../assets/images/gallery.png";
import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import {
  formatCurrency,
  formatPhoneNumber,
  formattedHours,
  handleValidImageURL,
} from "../../utils/helpers";
import DataItemDes from "./DataItemDes";

const StyledStationDataBox = styled.section`
  /* Box */
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
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: flex;
  align-items: center;
  gap: 5px;
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
  const {
    id: stationId,
    logo,
    coverPhoto,
    dateCreated,
    openingHours,
    closingHours,
    phone,
    brandName,
    email,
    state,
    description,
    address,
    numberOfFollowers,
    greenWalletName,
    greenWalletBalance,
    totalIncome,
    totalSpending,
  } = brand;

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidCoverPhoto, setIsValidCoverPhoto] = useState(true);
  const [isValidLogo, setIsValidLogo] = useState(true);

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

            {openingHours ? (
              <DataItem label=" Giờ mở cửa:">
                <div>
                  {formattedHours(openingHours)} &mdash;{" "}
                  {formattedHours(closingHours)}
                </div>
              </DataItem>
            ) : (
              <DataItem label=" Giờ mở cửa:">
                <div>Chưa cập nhật</div>
              </DataItem>
            )}

            <DataItem label="Số người theo dõi:">{numberOfFollowers}</DataItem>

            <DataItem label={greenWalletName + ":"}>
              <StyleGreenWallet>
                {formatCurrency(greenWalletBalance)}
                <StyledImageBean src={greenBean} alt="dau xanh" />
              </StyleGreenWallet>
            </DataItem>

            <StyledTotalBean>
              <DataItem label="Tổng nhận:">
                <StyleGreenWallet>
                  {formatCurrency(totalIncome)}
                  <StyledImageBean src={greenBean} alt="dau xanh" />
                </StyleGreenWallet>
              </DataItem>
              |
              <DataItem label="Tổng chi:">
                <StyleGreenWallet>
                  {formatCurrency(totalSpending)}
                  <StyledImageBean src={greenBean} alt="dau xanh" />
                </StyleGreenWallet>
              </DataItem>
            </StyledTotalBean>
            {description ? (
              <DataItemDes label="Mô tả thương hiệu:">
                {description}
              </DataItemDes>
            ) : (
              <DataItem label="Mô tả:">Chưa cập nhật</DataItem>
            )}
          </Infor>
        </Guest>

        <Price>
          <DataItem icon={<HiOutlineEnvelope />} label={`Gmail`}>
            {email}
          </DataItem>
          <DataItem icon={<HiOutlinePhone />} label={`Số điện thoại`}>
            {formatPhoneNumber(phone)}
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
      </Footer>
    </StyledStationDataBox>
  );
}

export default BrandDataBox;
