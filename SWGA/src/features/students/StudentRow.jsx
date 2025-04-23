import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/reading.png";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { formatPhoneNumber, handleValidImageURL } from "../../utils/helpers";

const StudentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Đặt thông tin nằm dưới hình ảnh */
  align-items: center; /* Căn giữa các phần tử */
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 1rem; /* Khoảng cách giữa hình ảnh và thông tin */
`;

const Img = styled.img`
  display: block;
  width: 80px; /* Tăng kích thước hình ảnh */
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
  text-align: center; /* Căn giữa tên sinh viên */
`;

const StackedFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center; /* Căn giữa tên và mã sinh viên */
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