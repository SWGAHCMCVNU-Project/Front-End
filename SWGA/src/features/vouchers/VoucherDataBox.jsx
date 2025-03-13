import { addHours, format, isValid } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import styled from "styled-components";
import coverPhotoBrandDefault from "../../assets/images/coupon.png";
import greenBean from "../../assets/images/dauxanh.png";
import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";
import { formatCurrency, handleValidImageURL } from "../../utils/helpers";
import DataItemDes from "../brands/DataItemDes";

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

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Footer = styled.footer`
  padding: 0 4rem 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Flag = styled.img`
  width: 40rem;
  border-radius: 8px;
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : coverPhotoBrandDefault)});
`;

const StyledTotalBean = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

const TagState = styled.span`
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
  width: 160px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  border: 1px solid var(--color-${(props) => props.type}-600);
`;

function VoucherDataBox({ voucher }) {
  // Log dữ liệu để kiểm tra

  // Destructuring các trường từ voucher
  const {
    id: voucherId,
    typeName,
    image,
    dateCreated,
    voucherName,
    state,
    description,
    condition,
    price,
    rate,
  } = voucher;

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  // Hàm chuyển đổi HTML thành JSX
  const convertHTMLToJSX = (htmlContent) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  // Xử lý dateCreated an toàn
  const formattedDate = dateCreated
    ? isValid(new Date(dateCreated))
      ? format(addHours(new Date(dateCreated), 7), "dd MMM yyyy, p", { locale: vi })
      : "Ngày không hợp lệ"
    : "Chưa cập nhật";

  return (
    <StyledStationDataBox>
      <Section>
        <Guest>
          <Flag
            src={isValidImage ? image || "" : ""}
            alt={`Image of ${voucherName}`}
          />
          <Infor>
            <HeadingGroup>
              <Heading as="h1">{voucherName}</Heading>
              <TagState type={statusToTagName[state]}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </TagState>
            </HeadingGroup>

            <StyledTotalBean>
              <DataItem label="Giá voucher:">
                <StyleGreenWallet>
                  {formatCurrency(price)}{" "}
                  <StyledImageBean src={greenBean} alt="dau xanh" />
                </StyleGreenWallet>
              </DataItem>
              |
              <DataItem label="Tỉ lệ chuyển đổi:">
                <StyleGreenWallet>x{rate}</StyleGreenWallet>
              </DataItem>
            </StyledTotalBean>

            <DataItem label="Thể loại:">
              <StyleGreenWallet>{typeName}</StyleGreenWallet>
            </DataItem>

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
        <p>Ngày tạo: {formattedDate}</p>
      </Footer>
    </StyledStationDataBox>
  );
}

export default VoucherDataBox;