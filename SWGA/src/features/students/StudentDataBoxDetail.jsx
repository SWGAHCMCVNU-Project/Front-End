import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import redBean from "../../assets/images/daudo.png";
import greenBean from "../../assets/images/dauxanh.png";
import logoDefaultCard from "../../assets/images/id-card.png";
import logoUniDefault from "../../assets/images/universityLogo.png";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import {
  formatCurrency,
  formatPhoneNumber,
  handleValidImageURL,
} from "../../utils/helpers";
import DataItem from "./DataItem";

const StyledStudentDataBox = styled.section`
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
  justify-content: space-between;
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
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
`;

const StyleRedWallet = styled.div`
  color: var(--color-error-700);
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

const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -7.33rem;
`;

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

function getGenderLabel(gender) {
  return gender === "Male" ? "Nam" : gender === "Female" ? "Nữ" : gender;
}

function StudentDataBoxDetail({ student }) {
  const {
    id: studentId,
    image,
    dateCreated,
    phone,
    fullName,
    email,
    state,
    address,
    avatar,
    stateName,
    dateOfBirth,
    gender,
    code,
    universityName,
    universityImage,
    campusName,
    majorName,
    greenWalletBalance,
    greenWalletName,
    redWalletName,
    redWalletBalance,
    studentCardBack,
    studentCardFront,
  } = student;

  const statusToTagName = {
    Pending: "green",
    Active: "cyan",
    Inactive: "error",
    Rejected: "orange",
  };

  const [expanded, setExpanded] = useState(false);

  // Function to toggle the expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const [isValidAvatar, setIsValidAvatar] = useState(true);
  const [isValidUniversityImage, setIsValidUniversityImage] = useState(true);
  const [isValidStudentCardFront, setIsValidStudentCardFront] = useState(true);
  const [isValidStudentCardBack, setIsValidStudentCardBack] = useState(true);

  useEffect(() => {
    handleValidImageURL(avatar)
      .then((isValid) => setIsValidAvatar(isValid))
      .catch(() => setIsValidAvatar(false));

    handleValidImageURL(universityImage)
      .then((isValid) => setIsValidUniversityImage(isValid))
      .catch(() => setIsValidUniversityImage(false));

    handleValidImageURL(studentCardFront)
      .then((isValid) => setIsValidStudentCardFront(isValid))
      .catch(() => setIsValidStudentCardFront(false));

    handleValidImageURL(studentCardBack)
      .then((isValid) => setIsValidStudentCardBack(isValid))
      .catch(() => setIsValidStudentCardBack(false));
  }, [avatar, universityImage, studentCardFront, studentCardBack]);

  return (
    <StyledStudentDataBox>
      <Section>
        <Guest>
          <HeadingGroup>
            <LeftHeadingGroup>
              <LogoUniversity
                src={isValidUniversityImage ? universityImage : logoUniDefault}
                alt={`Image of ${fullName}`}
              />
              <Heading as="h2">{fullName}</Heading>
              <Tag type={statusToTagName[state]}>{stateName}</Tag>
            </LeftHeadingGroup>

            {/* <ButtonGroup>
              <Modal>
                <Modal.Open opens="edit">
                  <Button $variations="primary">
                    <StyledContainerButton>
                      <StyledButton>
                        <HiPencil />
                      </StyledButton>
                      Chỉnh sửa
                    </StyledContainerButton>
                  </Button>
                </Modal.Open>
                <Modal.Window name="edit">
                  <CreateStudentForm studentToEdit={student} />
                </Modal.Window>
              </Modal>
            </ButtonGroup> */}
          </HeadingGroup>
          <Infor>
            <SectionInfo>
              <ComponentInfo>
                {fullName && <DataItem label="Họ và tên:">{fullName}</DataItem>}
                {code && <DataItem label="Mã số sinh viên:">{code}</DataItem>}
                {expanded && (
                  <>
                    {email && <DataItem label="Email :">{email}</DataItem>}
                    {phone ? (
                      <DataItem label="Số điện thoại:">
                        {formatPhoneNumber(phone)}
                      </DataItem>
                    ) : (
                      <DataItem label="Số điện thoại:">Chưa cập nhật</DataItem>
                    )}
                  </>
                )}
              </ComponentInfo>
            </SectionInfo>
            <SectionInfo>
              <ComponentInfo>
                {universityName && (
                  <DataItem label="Đại học:">{universityName}</DataItem>
                )}
                {majorName && (
                  <DataItem label="Chuyên ngành:">{majorName}</DataItem>
                )}
                {expanded && (
                  <>
                    {dateOfBirth && (
                      <DataItem label="Ngày sinh:">
                        {format(new Date(dateOfBirth), "dd/MM/yyyy")}
                      </DataItem>
                    )}
                    {gender && (
                      <DataItem label="Giới tính:">
                        {getGenderLabel(gender)}
                      </DataItem>
                    )}
                  </>
                )}
              </ComponentInfo>
            </SectionInfo>

            <SectionInfo>
              <ComponentInfo>
                <DataItem label={greenWalletName + ":"}>
                  <StyleGreenWallet>
                    {formatCurrency(greenWalletBalance)}{" "}
                    <StyledImageBean src={greenBean} alt="dau xanh" />
                  </StyleGreenWallet>
                </DataItem>

                <DataItem label={redWalletName + ":"}>
                  <StyleRedWallet>
                    {formatCurrency(redWalletBalance)}{" "}
                    <StyledImageBean src={redBean} alt="dau do" />
                  </StyleRedWallet>
                </DataItem>
                {expanded && (
                  <>
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
                  </>
                )}
              </ComponentInfo>
            </SectionInfo>
          </Infor>
          <ContainerButton>
            <Button $variations="secondary" onClick={toggleExpanded}>
              {expanded ? "Thu gọn" : "Xem thêm"}
            </Button>
          </ContainerButton>
          <ContainerImageCard>
            <SectionInfo>
              <LabelCard>Hình ảnh mặt trước thẻ sinh viên</LabelCard>
              <ImageCard
                src={
                  isValidStudentCardFront ? studentCardFront : logoDefaultCard
                }
                alt={`Image student card front of ${fullName}`}
              />
            </SectionInfo>
            <SectionInfo>
              <LabelCard>Hình ảnh mặt sau thẻ sinh viên</LabelCard>
              <ImageCard
                src={isValidStudentCardBack ? studentCardBack : logoDefaultCard}
                alt={`Image of student card back of ${fullName}`}
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
  );
}

export default StudentDataBoxDetail;
