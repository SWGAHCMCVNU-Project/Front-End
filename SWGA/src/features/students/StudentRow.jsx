import { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/reading.png";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import MyModal from "../../ui/custom/Modal/MyModal";
import { formatPhoneNumber, handleValidImageURL } from "../../utils/helpers";
import { useDeleteStudent } from "./useDeleteStudent";

const StudentContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
`;

const Img = styled.img`
  display: block;
  align-items: center;
  width: ${(props) => (props.src ? "50px" : "38px")};
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  margin-left: ${(props) => (props.src ? "2rem" : "0.5rem")};

  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StudentName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StackedFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const StyledCode = styled.div`
  color: var(--color-grey-500);
  font-size: 1.2rem;
  font-weight: 500;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const StyledCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  text-align: left;
  background: none;
  border: none;
  padding: 0.4rem 0.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
    border: 1px solid var(--color-green-600);
    border-radius: 5px;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & svg:hover {
    color: var(--color-green-600);
  }
`;

const StudentIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
  gap: 0.3rem;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const StyledNavigateButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

function StudentRow({ student, displayedIndex }) {
  const { isDeleting, deleteStudent } = useDeleteStudent();
  const {
    id: studentId,
    avatar,
    phone,
    fullName,
    email,
    state,
    stateName,
    universityName,
    campusName,
    majorName,
    code,
  } = student;

  const NavigateButton = ({ children }) => {
    const navigate = useNavigate();
    return (
      <StyledNavigateButton onClick={() => navigate(`/students/${studentId}`)}>
        {children}
      </StyledNavigateButton>
    );
  };

  const statusToTagName = {
    "Chờ duyệt": "green",
    "Hoạt động": "cyan", 
    "Không hoạt động": "error",
    "Từ chối": "orange"
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(avatar)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [avatar]);

  return (
    <Table.Row>
      <NavigateButton>
        <StudentIndex>{displayedIndex}</StudentIndex>
      </NavigateButton>

      <NavigateButton>
        <StudentContainer>
          {isValidImage ? (
            <Img src={avatar || ""} />
          ) : (
            <Img src={logoDefault} />
          )}
          <StackedFrame>
            <StudentName>{fullName}</StudentName>
            <StyledCode>{code}</StyledCode>
          </StackedFrame>
        </StudentContainer>
      </NavigateButton>

      <NavigateButton>
        <Stacked>
          <span>{email}</span>
          <span>{formatPhoneNumber(phone)}</span>
        </Stacked>
      </NavigateButton>

      <NavigateButton>
        <Stacked>
          <span>{universityName}</span>
          <span>{campusName}</span>
        </Stacked>
      </NavigateButton>

      <NavigateButton>
        <StyledCenter>{majorName}</StyledCenter>
      </NavigateButton>

      <NavigateButton>
        <Tag type={statusToTagName[state]}>{stateName}</Tag>
      </NavigateButton>

      <StyledAction>
        <MyModal>
          {/* <MyModal.Open opens="edit">
            <StyledButton>
              <HiPencil />
            </StyledButton>
          </MyModal.Open>
          <MyModal.Window name="edit">
            <CreateStudentForm studentToEdit={student} />
          </MyModal.Window> */}

          <MyModal.Open opens="disable">
            <StyledButton>
              <HiTrash />
            </StyledButton>
          </MyModal.Open>
          <MyModal.Window name="disable">
            <ConfirmDelete
              resourceName="sinh viên"
              disabled={isDeleting}
              onConfirm={() => deleteStudent(studentId)}
              confirmMessage="Bạn có chắc muốn vô hiệu hóa sinh viên này?"
            />
          </MyModal.Window>
        </MyModal>
      </StyledAction>
    </Table.Row>
  );
}

export default StudentRow;
