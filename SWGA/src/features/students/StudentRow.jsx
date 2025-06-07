import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/reading.png";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { formatPhoneNumber, handleValidImageURL } from "../../utils/helpers";
import { useUpdateStudent } from "../../hooks/student/useUpdateStudents";
import { Switch } from "antd";

const StudentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 1rem;
`;

const Img = styled.img`
  display: block;
  width: 80px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  padding: 0.5rem;
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StudentName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-align: center;
`;

const StackedFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
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
  max-width: 100%;
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

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SwitchLabel = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

function StudentRow({ student, index, displayedIndex }) {
  const navigate = useNavigate();
  const { mutate: updateStudent, isLoading } = useUpdateStudent();
  const [localState, setLocalState] = useState(student.state); // Local state for immediate UI feedback

  const handleNameClick = (e) => {
    e.stopPropagation();
    navigate(`/students/${student.accountId}`);
  };

  const statusToTagName = {
    1: "green",
    2: "cyan",
    3: "error",
    4: "orange",
  };

  const stateToName = {
    1: "Chờ xác thực",
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

  // Use localState for rendering, which updates immediately
  const stateName = stateToName[localState] || "Không xác định";

  // Trong StudentRow.jsx
  const handleStateChange = (checked) => {
    const newState = checked ? 2 : 3;
    updateStudent(
      { accountId: student.accountId, state: newState },
      {
        onSuccess: (data) => {
          console.log("Server response:", data); // Kiểm tra data trả về
          setLocalState(newState); // Cập nhật UI ngay lập tức
        },
        onError: (error) => {
          console.error("Error details:", error.response?.data);
          setLocalState(student.state); // Rollback UI nếu có lỗi
        },
      }
    );
  };
  // Chỉ hiển thị Switch cho trạng thái 2 hoặc 3
  const showSwitch = [2, 3].includes(localState);

  return (
    <Table.Row onClick={() => navigate(`/students/${student.accountId}`)}>
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
      {showSwitch ? (
        <SwitchContainer>
          <Switch
            checked={localState === 2}
            onChange={handleStateChange}
            disabled={isLoading}
          />
          <SwitchLabel>{stateName}</SwitchLabel>
        </SwitchContainer>
      ) : (
        <Tag type={statusToTagName[localState] || "default"}>{stateName}</Tag>
      )}
    </Table.Row>
  );
}

export default StudentRow;
