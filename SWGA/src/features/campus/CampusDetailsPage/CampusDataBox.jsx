import { Tag } from "antd";
import {
  HiOutlineEnvelope,
  HiOutlineHomeModern,
  HiOutlinePhone,
} from "react-icons/hi2";
import styled from "styled-components";
import imgDefaultCampus from "../../../assets/images/universityLogo.png"; // Đổi tên ảnh mặc định nếu cần
import { Flag } from "../../../ui/Flag";
import Heading from "../../../ui/Heading";
import {
  formatDateTime,
  formatPhoneNumber,
  useImageValidity,
} from "../../../utils/helpers";
import "./scss/CampusDataBox.scss";

// Styled component for DataItem with strict alignment
const DataItemStyled = styled.div`
  display: flex;
  align-items: baseline; /* Thay đổi từ center sang baseline */
  gap: 0.8rem;
  height: 100%;

  & > svg {
    height: 2.4rem;
    width: 2.4rem;
    flex-shrink: 0;
    margin-top: 3px; /* Dịch icon xuống 3px */
  }

  & > span {
    font-size: 1.6rem;
    line-height: 2.4rem; /* Đặt line-height bằng chiều cao icon */
    display: flex;
  }

  & > span:first-of-type {
    font-weight: 500;
    white-space: nowrap;
    margin-right: 0.4rem; /* Thêm khoảng cách giữa label và nội dung */
  }

  & > span:last-of-type {
    color: var(--color-grey-700);
    word-break: break-all;
    align-self: center; /* Căn giữa theo chiều dọc */
  }
`;
const PriceContent = styled.div`
  display: flex;
  align-items: baseline; /* Căn theo baseline */
  gap: 5rem;
  width: 100%;
  justify-content: center;
  padding: 4px 0; /* Thêm padding để cân bằng */
`;
// Updated DataItem component
function DataItem({ icon, label, children }) {
  return (
    <DataItemStyled>
      {icon}
      <span>{label}</span>
      <span>{children}</span>
    </DataItemStyled>
  );
}

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
  align-items: center; /* Đảm bảo căn giữa theo chiều dọc */
  justify-content: center;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
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

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function CampusDataBox({ campus }) {
  const {
    id: campusId,
    image,
    campusName,
    dateCreated,
    phone,
    email,
    state,
    description,
    link,
    areaName,
    address,
    numberOfStudents,
  } = campus;

  const campusImage = image;
  const isValidImages = useImageValidity(campus, campusImage);

  return (
    <StyledStationDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <span>{campusName}</span>
        </div>
      </Header>

      <Section>
        <Guest>
          <Flag
            src={
              isValidImages.find(() => true) ? campusImage : imgDefaultCampus
            }
          />

          <Infor>
            <HeadingGroup>
              <Heading as="h1">{campusName}</Heading>
              <Tag className="status-tag" color={state ? "cyan" : "error"}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            </HeadingGroup>

            <div className="campus-details-information">
              <label>Khu vực: </label>
              <span>{areaName}</span>
            </div>

            <div className="campus-details-information">
              <label>Địa chỉ: </label>
              <span>{address}</span>
            </div>

            <div className="campus-details-information">
              <label>Số lượng sinh viên: </label>
              <span>{numberOfStudents ?? "Chưa cập nhật"}</span>
            </div>

            <div className="campus-details-description">{description}</div>

            {link && link !== "null" ? (
              <div className="link-web-uni">
                <label>Website: </label>
                <span>
                  <a
                    className="link-website"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link}
                  </a>
                </span>
              </div>
            ) : null}
          </Infor>
        </Guest>

        <Price>
          <PriceContent>
            <DataItem icon={<HiOutlineEnvelope />} label="Gmail">
              {email || "Chưa cập nhật"}
            </DataItem>
            <DataItem icon={<HiOutlinePhone />} label="Số điện thoại">
              {phone ? formatPhoneNumber(phone) : "Chưa cập nhật"}
            </DataItem>
          </PriceContent>
        </Price>
      </Section>

      <Footer>
        <p>Ngày tạo: {formatDateTime(dateCreated)}</p>
      </Footer>
    </StyledStationDataBox>
  );
}

export default CampusDataBox;
