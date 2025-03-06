import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import styled from "styled-components";
import coverPhotoBrandDefault from "../../assets/images/coupon.png";
import greenBean from "../../assets/images/dauxanh.png";
import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";
import { formatCurrency, handleValidImageURL } from "../../utils/helpers";

import { useEffect, useState } from "react";
import DataItemDes from "../brands/DataItemDes";

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
  gap: 5rem;
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
  /* margin-left: 10%; */

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

const StyleRedWallet = styled.div`
  color: var(--color-red-700);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
`;

const Footer = styled.footer`
  padding: 0 4rem 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const Flag = styled.img`
  width: ${(props) => (props.src ? "40rem" : "40rem")};
  border-radius: 8px;
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};

  // If image is empty or null, use logoDefault
  content: url(${(props) => (props.src ? props.src : coverPhotoBrandDefault)});
`;

const StyledTotalBean = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const TagCampaignState = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-transform: capitalize;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.2rem;
  border-radius: 5px;
  margin: 0 auto;
  width: 120px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  border: 1px solid var(--color-${(props) => props.type}-600);
`;

function VoucherDataBox({ voucher }) {
  const {
    id: voucherItemId,
    typeName,
    voucherImage,
    dateCreated,
    voucherName,
    state,
    description,
    condition,
    price,
    rate,
    voucherCode,
    campaignName,
    campaignState,
    campaignStateName,
  } = voucher;

  const campaignStateToTagName = {
    Pending: "green",
    Rejected: "tag-orange",
    Active: "cyan",
    Inactive: "error",
    Finished: "tag-blue",
    Closed: "red",
    Cancelled: "tag-volcano",
  };
  const [isValidCoverPhoto, setIsValidCoverPhoto] = useState(true);

  useEffect(() => {
    handleValidImageURL(voucherImage)
      .then((isValid) => setIsValidCoverPhoto(isValid))
      .catch(() => setIsValidCoverPhoto(false));
  }, [voucherImage]);

  const convertHTMLToJSX = (htmlContent) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  return (
    <StyledStationDataBox>
      <Section>
        <Guest>
          <Flag
            src={isValidCoverPhoto ? voucherImage || "" : ""}
            alt={`Image of ${voucherName}`}
          />

          <Infor>
            <HeadingGroup>
              <Heading as="h1">{voucherName}</Heading>
            </HeadingGroup>

            <DataItem label="Mã code:">
              <StyleGreenWallet>{voucherCode}</StyleGreenWallet>
            </DataItem>

            <StyledTotalBean>
              <DataItem label="Giá voucher:">
                <StyleGreenWallet>
                  {price ? formatCurrency(price) : "Chưa xác định"}{" "}
                  {price ? (
                    <StyledImageBean src={greenBean} alt="dau xanh" />
                  ) : null}
                </StyleGreenWallet>
              </DataItem>
              |
              <DataItem label="Tỉ lệ chuyển đổi:">
                <StyleGreenWallet>
                  {rate ? <span>x{rate} </span> : "Chưa xác định"}
                </StyleGreenWallet>
              </DataItem>
            </StyledTotalBean>

            <DataItem label="Thể loại:">
              <StyleGreenWallet>{typeName} </StyleGreenWallet>
            </DataItem>

            {campaignName ? (
              <DataItem label="Chiến dịch sở hữu phiếu:">
                <StyleRedWallet>{campaignName}</StyleRedWallet>
              </DataItem>
            ) : (
              <DataItem label="Chiến dịch sở hữu phiếu:">
                Chưa thêm vào chiến dịch
              </DataItem>
            )}

            {campaignStateName ? (
              <DataItem label="Trạng thái chiến dịch:">
                <TagCampaignState type={campaignStateToTagName[campaignState]}>
                  {campaignStateName}
                </TagCampaignState>
              </DataItem>
            ) : null}

            {description ? (
              <DataItemDes label="Mô tả voucher:">
                {convertHTMLToJSX(description)}
              </DataItemDes>
            ) : (
              <DataItem label="Mô tả:">Chưa cập nhật</DataItem>
            )}

            {condition ? (
              <DataItemDes label="Điều kiện:">
                {convertHTMLToJSX(condition)}
              </DataItemDes>
            ) : (
              <DataItem label="Điều kiện:">Chưa cập nhật</DataItem>
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
        </p>
      </Footer>
    </StyledStationDataBox>
  );
}

export default VoucherDataBox;
