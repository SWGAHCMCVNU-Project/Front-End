import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";
import { useEffect, useState } from "react";
import logoDefault from "../../../assets/images/campus.png";
import coverPhotoDefault from "../../../assets/images/gallery.png";
import DataItem from "../../../ui/DataItem";
import Heading from "../../../ui/Heading";
import Tag from "../../../ui/Tag";
import { handleValidImageURL, formatPhoneNumber } from "../../../utils/helpers";
import { useAreas } from "../../../hooks/areas/useAreas"; // Import the updated hook

const StyledCampusDataBox = styled.section`
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
`;

const Infor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);
  margin-left: 10%;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  gap: 5rem;
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
  width: 40rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : coverPhotoDefault)});
`;

const LogoCampus = styled.img`
  width: 8rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

function CampusDataBox({ campus }) {
  if (!campus) {
    return <div>No campus data available.</div>;
  }

  const {
    id = "",
    image = "",
    dateCreated = "",
    campusName = "Chưa cập nhật",
    state = false,
    description = "",
    address = "",
    areaId = "", // Sử dụng areaId thay vì areaName
    numberOfStudents = null,
    phone = "",
    email = "",
    link = "",
    dateUpdated = "",
  } = campus;

  // Sử dụng hook useAreas để lấy danh sách khu vực
  const { isLoading: isLoadingAreas, areas, error: areasError } = useAreas({
    page: 1,
    size: 100, // Ensure we fetch enough areas
    searchName: "",
    isAsc: true,
  });

  // Tìm areaName từ areaId, using areaName instead of name
  const areaName = areas?.result?.find((area) => area.id === areaId)?.areaName || "Chưa cập nhật";

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

  // Debug: Log để kiểm tra areaId và areaName
  console.log("CampusDataBox - areaId:", areaId);
  console.log("CampusDataBox - areaName:", areaName);
  console.log("CampusDataBox - areas:", areas?.result);

  return (
    <StyledCampusDataBox>
      <Section>
        <Guest>
          <Flag
            src={isValidImage ? image || "" : ""}
            alt={`Image of ${campusName}`}
          />
          <Infor>
            <HeadingGroup>
              <LogoCampus
                src={isValidImage ? image || "" : ""}
                alt={`Logo of ${campusName}`}
              />
              <Heading as="h1">{campusName}</Heading>
              <Tag type={statusToTagName[state]}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            </HeadingGroup>
            <DataItem label="Khu vực:">
              {isLoadingAreas ? "Đang tải..." : areasError ? "Lỗi tải khu vực" : areaName}
            </DataItem>
            <DataItem label="Địa chỉ:">{address || "Chưa cập nhật"}</DataItem>
            <DataItem label="Số lượng sinh viên:">
              {numberOfStudents !== null ? numberOfStudents : "Chưa cập nhật"}
            </DataItem>
            <DataItem label="Mô tả:">{description || "Chưa cập nhật"}</DataItem>
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
            {email || "Chưa cập nhật"}
          </DataItem>
          <DataItem
            icon={<HiOutlinePhone />}
            label="Số điện thoại"
            value={phone ? formatPhoneNumber(phone.trim()) : "Chưa cập nhật"}
          >
            {phone ? formatPhoneNumber(phone.trim()) : "Chưa cập nhật"}
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
    </StyledCampusDataBox>
  );
}

export default CampusDataBox;