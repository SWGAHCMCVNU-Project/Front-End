import { Tag } from "antd";
import { HiOutlineEnvelope, HiOutlineHomeModern, HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";
import imgDefaultStore from "../../assets/images/store.png";
import { formatDateTime, formatPhoneNumber, formattedHours, useImageValidity } from "../../utils/helpers";
import { Flag } from "../../ui/Flag";
import Heading from "../../ui/Heading";
import DataItem from "../../ui/DataItem";

const StyledStationDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-green-600);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
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
  gap: 5rem;
  background-color: ${(props) => (props.isActive ? "var(--color-green-100)" : "var(--color-yellow-100)")};
  color: ${(props) => (props.isActive ? "var(--color-green-700)" : "var(--color-yellow-700)")};

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

function StoreDataBox({ store }) {
  const {
    id: storeId,
    file, // Thêm file vào destructuring
    areaName,
    storeName,
    openingHours,
    closingHours,
    address,
    dateCreated,
    phone,
    email,
    state,
    description,
    numberOfCampaigns,
    numberOfVouchers,
    numberOfBonuses,
    amountOfBonuses,
  } = store;

  const storeImage = file; // Sửa từ avatar thành file
  const isValidImages = useImageValidity([store], [storeImage]); // Sửa để truyền mảng

  // Hàm hỗ trợ kiểm tra và định dạng giờ
  const safeFormattedHours = (time) => {
    if (!time || typeof time !== "string" || !time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)) {
      return "Không xác định";
    }
    try {
      return formattedHours(time);
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Không xác định";
    }
  };

  // Xử lý phone loại bỏ khoảng trắng thừa
  const cleanPhone = phone ? phone.trim() : null;

  return (
    <StyledStationDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <span>
            {storeName} tại {areaName}
          </span>
        </div>
      </Header>

      <Section>
        <Guest>
          <Flag src={isValidImages[0] ? storeImage : imgDefaultStore} /> {/* Sửa để lấy giá trị đầu tiên từ isValidImages */}

          <Infor>
            <HeadingGroup>
              <Heading as="h1">{storeName}</Heading>
              <Tag className="status-tag" color={state ? "cyan" : "error"}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            </HeadingGroup>

            <div className="campus-details-information">
              <label>Giờ mở cửa: </label>
              <span>
                {safeFormattedHours(openingHours)} — {safeFormattedHours(closingHours)}
              </span>
            </div>

            <div className="campus-details-information">
              <label>Số lượng chiến dịch đã chạy: </label>
              <span>{numberOfCampaigns || 0}</span>
            </div>

            <div className="campus-details-information">
              <label>Số lượng ưu đãi đã dùng tại cửa hàng: </label>
              <span>{numberOfVouchers || 0}</span>
            </div>

           

            <div className="campus-details-description">Mô tả: {description || "Không có mô tả"}</div>

            {address && (
              <div className="campus-address">
                <label>Địa chỉ: </label>
                <span>{address}</span>
              </div>
            )}
          </Infor>
        </Guest>

        <Price isActive={state}>
          <DataItem icon={<HiOutlineEnvelope />} label={`Gmail`}>
            {email || "Không có email"}
          </DataItem>
          <DataItem icon={<HiOutlinePhone />} label={`Số điện thoại`}>
            {cleanPhone ? formatPhoneNumber(cleanPhone) : "Không có số điện thoại"}
          </DataItem>
        </Price>
      </Section>

      <Footer>
        <p>Ngày tạo: {formatDateTime(dateCreated) || "Không xác định"}</p>
      </Footer>
    </StyledStationDataBox>
  );
}

export default StoreDataBox;