import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import styled from "styled-components";
import { useEffect, useState } from "react";
import logoDefault from "../../assets/images/brand.png";
import coverPhotoBrandDefault from "../../assets/images/gallery.png";
import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import { formatCurrency, formattedHours, handleValidImageURL } from "../../utils/helpers";
import DataItemDes from "./DataItemDes";

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
  // Nếu brand là null hoặc undefined, hiển thị fallback UI
  if (!brand) {
    return (
      <StyledStationDataBox>
        <Section>
          <Heading as="h1">Không tìm thấy thương hiệu</Heading>
        </Section>
      </StyledStationDataBox>
    );
  }

  // Destructure các thuộc tính từ Swagger
  const {
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
  } = brand;

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidCoverPhoto, setIsValidCoverPhoto] = useState(true);

  useEffect(() => {
    handleValidImageURL(coverPhoto)
      .then((isValid) => setIsValidCoverPhoto(isValid))
      .catch(() => setIsValidCoverPhoto(false));
  }, [coverPhoto]);

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
              {/* Không có logo trong Swagger, dùng coverPhoto làm logo tạm thời */}
              <LogoBrand
                src={isValidCoverPhoto ? coverPhoto || "" : ""}
                alt={`Logo of ${brandName}`}
              />
              <Heading as="h1">{brandName}</Heading>
              <Tag type={statusToTagName[state]}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            </HeadingGroup>

            <DataItem label="Tên viết tắt:">{acronym}</DataItem>

            {address ? (
              <DataItem label="Địa chỉ:">{address}</DataItem>
            ) : (
              <DataItem label="Địa chỉ:">Chưa cập nhật</DataItem>
            )}

            {link ? (
              <DataItem label="Liên kết:">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </DataItem>
            ) : (
              <DataItem label="Liên kết:">Chưa cập nhật</DataItem>
            )}

            {openingHours ? (
              <DataItem label="Giờ mở cửa:">
                <div>
                  {formattedHours(openingHours)} —{" "}
                  {formattedHours(closingHours)}
                </div>
              </DataItem>
            ) : (
              <DataItem label="Giờ mở cửa:">
                <div>Chưa cập nhật</div>
              </DataItem>
            )}

            <StyledTotalBean>
              <DataItem label="Tổng nhận:">
                {totalIncome !== null ? formatCurrency(totalIncome) : "Chưa cập nhật"}
              </DataItem>
              |
              <DataItem label="Tổng chi:">
                {totalSpending !== null ? formatCurrency(totalSpending) : "Chưa cập nhật"}
              </DataItem>
            </StyledTotalBean>

            {description ? (
              <DataItemDes label="Mô tả thương hiệu:">{description}</DataItemDes>
            ) : (
              <DataItem label="Mô tả:">Chưa cập nhật</DataItem>
            )}
          </Infor>
        </Guest>
      </Section>

      <Footer>
        <p>
          Ngày tạo:{" "}
          {format(addHours(new Date(dateCreated), 7), "dd MMM yyyy, p", {
            locale: vi,
          })}
          {dateUpdated && (
            <> | Ngày cập nhật: {format(addHours(new Date(dateUpdated), 7), "dd MMM yyyy, p", { locale: vi })}</>
          )}
        </p>
      </Footer>
    </StyledStationDataBox>
  );
}

export default BrandDataBox;