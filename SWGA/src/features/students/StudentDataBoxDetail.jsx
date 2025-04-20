import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import redBean from "../../assets/images/daudo.png";
import greenBean from "../../assets/images/dauxanh.png";
import logoDefaultCard from "../../assets/images/id-card.png";
import logoUniDefault from "../../assets/images/universityLogo.png";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import {
  formatCurrency,
  formatPhoneNumber,
  handleValidImageURL,
} from "../../utils/helpers";
import DataItem from "./DataItem";
import styled from "styled-components";

const StyledStudentDataBox = styled.section`
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
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Infor = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const SectionInfo = styled.div`
  flex: 1;
`;

const ComponentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  color: var(--color-grey-500);
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-start;
`;

const LeftHeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContainerImageCard = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: space-between;
`;

const LabelCard = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  margin: 1rem 0 1.5rem 0;
  color: var(--color-green-600);
`;

const ImageCard = styled.img`
  width: 100%;
  border-radius: var(--border-radius-lg);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  height: 40rem;
  padding: 1.5rem 2.5rem;
  overflow: hidden;
  object-fit: contain;

  content: url(${(props) => (props.src ? props.src : logoDefaultCard)});
`;

const LogoUniversity = styled.img`
  width: 8rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoUniDefault)});
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-left: 0.5rem;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
`;

const StyleRedWallet = styled.div`
  color: var(--color-error-700);
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-transform: capitalize;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.2rem;
  border-radius: 5px;
  width: 120px;
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  border: 1px solid var(--color-${(props) => props.type}-600);
`;

const BackButtonContainer = styled.div`
  margin-bottom: 1rem;
  margin-left: 0;
`;

function getGenderLabel(gender) {
  return gender === 2 ? "Nam" : gender === 1 ? "Nữ" : gender === 0 ? "Khác" : "Không xác định";
}

function StudentDataBoxDetail({ student }) {
  const navigate = useNavigate();
  console.log("Student data:", student);
  const {
    id: studentId,
    dateCreated,
    phone,
    fullName,
    studentEmail: email,
    state,
    address,
    avatar,
    dateOfBirth,
    gender,
    code,
    campusName,
    campusImage,
    totalIncome,
    totalSpending,
    coinBalance, // Thêm coinBalance
    studentCardBack,
    studentCardFront,
  } = student || {};

  const greenWalletName = "Tổng nhận";
  const redWalletName = "Tổng chi";

  const statusToTagName = {
    1: "green",
    2: "cyan",
    3: "error",
    4: "orange",
  };

  const stateToName = {
    1: "Chờ duyệt",
    2: "Hoạt động",
    3: "Không hoạt động",
    4: "Từ chối",
  };

  const [isValidAvatar, setIsValidAvatar] = useState(true);
  const [isValidCampusImage, setIsValidCampusImage] = useState(true);
  const [isValidStudentCardFront, setIsValidStudentCardFront] = useState(true);
  const [isValidStudentCardBack, setIsValidStudentCardBack] = useState(true);

  useEffect(() => {
    handleValidImageURL(avatar)
      .then((isValid) => setIsValidAvatar(isValid))
      .catch(() => setIsValidAvatar(false));

    handleValidImageURL(campusImage)
      .then((isValid) => setIsValidCampusImage(isValid))
      .catch(() => setIsValidCampusImage(false));

    handleValidImageURL(studentCardFront)
      .then((isValid) => setIsValidStudentCardFront(isValid))
      .catch(() => setIsValidStudentCardFront(false));

    handleValidImageURL(studentCardBack)
      .then((isValid) => setIsValidStudentCardBack(isValid))
      .catch(() => setIsValidStudentCardBack(false));
  }, [avatar, campusImage, studentCardFront, studentCardBack]);

  if (!student) return null;

  const stateName = stateToName[state] || "Không xác định";

  return (
    <>
      <BackButtonContainer>
        <ButtonText onClick={() => navigate("/students")}>
          ← Quay lại
        </ButtonText>
      </BackButtonContainer>
      <StyledStudentDataBox>
        <Section>
          <Guest>
            <HeadingGroup>
              <LeftHeadingGroup>
                <LogoUniversity
                  src={isValidCampusImage ? campusImage : logoUniDefault}
                  alt={`Image of ${fullName}`}
                />
                <Heading as="h2">{fullName}</Heading>
                <Tag type={statusToTagName[state]}>{stateName}</Tag>
              </LeftHeadingGroup>
            </HeadingGroup>
            <Infor>
              <SectionInfo>
                <ComponentInfo>
                  {fullName && <DataItem label="Họ và tên:">{fullName}</DataItem>}
                  {code && <DataItem label="Mã số sinh viên:">{code}</DataItem>}
                  {email && <DataItem label="Email:">{email}</DataItem>}
                  {phone ? (
                    <DataItem label="Số điện thoại:">
                      {formatPhoneNumber(phone)}
                    </DataItem>
                  ) : (
                    <DataItem label="Số điện thoại:">Chưa cập nhật</DataItem>
                  )}
                </ComponentInfo>
              </SectionInfo>
              <SectionInfo>
                <ComponentInfo>
                  {campusName && (
                    <DataItem label="Campus:">{campusName}</DataItem>
                  )}
                  {dateOfBirth && (
                    <DataItem label="Ngày sinh:">
                      {format(new Date(dateOfBirth), "dd/MM/yyyy")}
                    </DataItem>
                  )}
                  {gender !== undefined && (
                    <DataItem label="Giới tính:">
                      {getGenderLabel(gender)}
                    </DataItem>
                  )}
                </ComponentInfo>
              </SectionInfo>
              <SectionInfo>
                <ComponentInfo>
                  <DataItem label={greenWalletName + ":"}>
                    <StyleGreenWallet>
                      {formatCurrency(totalIncome || 0)}
                      <StyledImageBean src={greenBean} alt="dau xanh" />
                    </StyleGreenWallet>
                  </DataItem>
                  <DataItem label={redWalletName + ":"}>
                    <StyleRedWallet>
                      {formatCurrency(totalSpending || 0)}
                      <StyledImageBean src={greenBean} alt="dau do" />
                    </StyleRedWallet>
                  </DataItem>
                 
                  {address ? (
                    <DataItem label="Địa chỉ:">{address}</DataItem>
                  ) : (
                    <DataItem label="Địa chỉ:">Chưa cập nhật</DataItem>
                  )}
                  {state && (
                    <DataItem label="Trạng thái:">
                      <Tag type={statusToTagName[state]}>{stateName}</Tag>
                    </DataItem>
                  )}
                </ComponentInfo>
              </SectionInfo>
            </Infor>
            <ContainerImageCard>
              <SectionInfo>
                <LabelCard>Hình ảnh mặt trước thẻ sinh viên</LabelCard>
                <ImageCard
                  src={isValidStudentCardFront ? studentCardFront : logoDefaultCard}
                  alt={`Image student card front of ${fullName}`}
                />
              </SectionInfo>
            </ContainerImageCard>
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
      </StyledStudentDataBox>
    </>
  );
}

export default StudentDataBoxDetail;