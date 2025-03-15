import styled from "styled-components";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import DataItem from "../../../ui/DataItem";
import Heading from "../../../ui/Heading";
import { formatPhoneNumber } from "../../../utils/helpers";

const StyledAccountDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
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

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  gap: 5rem;

  background-color: var(--color-green-100);
  color: var(--color-green-700);

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

function AccountDataBox({ account }) {
  const { userName, phone, email } = account || {};

  return (
    <StyledAccountDataBox>
      <Section>
        <Infor>
          <HeadingGroup>
            <Heading as="h2">Thông tin tài khoản</Heading>
          </HeadingGroup>
          <DataItem label="Tên người dùng">{userName || "Chưa cập nhật"}</DataItem>
          <DataItem label="Số điện thoại">
            {phone ? formatPhoneNumber(phone.trim()) : "Chưa cập nhật"}
          </DataItem>
          <DataItem label="Email">{email || "Chưa cập nhật"}</DataItem>
        </Infor>

        {/* <Price>
          <DataItem icon={<HiOutlineEnvelope />} label="Email" value={email}>
            {email || "Chưa cập nhật"}
          </DataItem>
          <DataItem
            icon={<HiOutlinePhone />}
            label="Số điện thoại"
            value={phone ? formatPhoneNumber(phone.trim()) : "Chưa cập nhật"}
          >
            {phone ? formatPhoneNumber(phone.trim()) : "Chưa cập nhật"}
          </DataItem>
        </Price> */}
      </Section>

      <Footer>
        <p>Dữ liệu tài khoản được cập nhật tự động.</p>
      </Footer>
    </StyledAccountDataBox>
  );
}

export default AccountDataBox;