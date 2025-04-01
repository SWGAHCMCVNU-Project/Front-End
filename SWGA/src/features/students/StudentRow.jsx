import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/reading.png";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { formatPhoneNumber, handleValidImageURL } from "../../utils/helpers";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

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
  display: center;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 100%;
  margin-left: -120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.3rem;
  }
`;

const StyledRow = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function StudentRow({ student, index, displayedIndex }) {
  const navigate = useNavigate();

  const handleNameClick = (e) => {
    e.stopPropagation();
    navigate(`/students/${student.id}`);
  };

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

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(student.avatar)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [student.avatar]);

  const stateName = stateToName[student.state] || "Không xác định";

  return (
    <Table.Row onClick={() => navigate(`/students/${student.id}`)}>
      <StyledRow>{displayedIndex}</StyledRow>
      <StudentContainer>
        {isValidImage ? (
          <Img src={student.avatar || ""} />
        ) : (
          <Img src={logoDefault} />
        )}
        <StackedFrame>
          <StudentName onClick={handleNameClick} style={{ cursor: "pointer" }}>
            {student.fullName}
          </StudentName>
          <StyledCode>{student.code}</StyledCode>
        </StackedFrame>
      </StudentContainer>
      <Stacked>
        <span>{formatPhoneNumber(student.phone) || "Chưa cập nhật"}</span>
        <span>{student.studentEmail || "Chưa cập nhật"}</span>
      </Stacked>
      <div>{student.campusName || "Chưa cập nhật"}</div>
      <Tag type={statusToTagName[student.state]}>{stateName}</Tag>
    </Table.Row>
  );
}

export default StudentRow;
