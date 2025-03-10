/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import logoDefault from "../../assets/images/reading.png";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import MyModal from "../../ui/custom/Modal/MyModal";
import { formatPhoneNumber, handleValidImageURL } from "../../utils/helpers";
import { useDeleteLecturer } from "./useDeleteLecturer";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { mockUniversities, mockMajors } from "./mockLecturers";

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  height: 100%;
  padding: 1rem 0.5rem;
  min-height: 60px;
`;

const LecturerContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
  height: 100%;
  padding: 1rem 0.5rem;
  min-height: 60px;
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

const LecturerName = styled.div`
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
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem 0.5rem;
  min-height: 60px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.4rem;
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

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  height: 100%;
  padding: 1rem 0.5rem;
  min-height: 60px;
`;

function LecturerRow({ lecturer, index, pointsRemaining, pointsAllocated, pointsUsed, onAllocate }) {
  const { isDeleting, deleteLecturer } = useDeleteLecturer();
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleNameClick = (e) => {
    e.stopPropagation();
  };

  const statusToTagName = {
    "Chờ duyệt": "green",
    "Hoạt động": "cyan",
    "Không hoạt động": "error",
    "Từ chối": "orange",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(lecturer.avatar)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [lecturer.avatar]);

  const university = mockUniversities.result.find((u) => u.id === lecturer.universityId);
  const major = mockMajors.result.find((m) => m.id === lecturer.majorId);

  return (
    <>
      <Table.Row style={{ minHeight: "60px", display: "flex", alignItems: "center" }}>
        <StyledRow>{index}</StyledRow>
        <LecturerContainer>
          {isValidImage ? <Img src={lecturer.avatar || ""} /> : <Img src={logoDefault} />}
          <StackedFrame>
            <LecturerName onClick={handleNameClick}>{lecturer.fullName}</LecturerName>
            <StyledCode>{lecturer.code}</StyledCode>
          </StackedFrame>
        </LecturerContainer>
        <Stacked>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {formatPhoneNumber(lecturer.phone)}
          </span>
        </Stacked>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60px" }}>
          {university ? university.universityName : "Không có dữ liệu"}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60px" }}>
          {major ? major.majorName : "Không có dữ liệu"}
        </div>
        <Tag
          type={statusToTagName[lecturer.state ? "Hoạt động" : "Không hoạt động"]}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "36px" }}
        >
          {lecturer.state ? "Hoạt động" : "Không hoạt động"}
        </Tag>
        <StyledRow>{pointsRemaining}</StyledRow>
        <StyledRow>{pointsAllocated}</StyledRow>
        <StyledRow>{pointsUsed}</StyledRow>
        <StyledRow>{pointsRemaining}</StyledRow>
        <StyledAction>
          <StyledButton onClick={(e) => { e.stopPropagation(); onAllocate(); }}>
            <HiPlus />
          </StyledButton>
          <MyModal>
            <MyModal.Open opens="disable">
              <StyledButton>
                <HiTrash />
              </StyledButton>
            </MyModal.Open>
            <MyModal.Window name="disable">
              <ConfirmDelete
                resourceName="giảng viên"
                disabled={isDeleting}
                onConfirm={() => deleteLecturer(lecturer.id)}
                confirmMessage="Bạn có chắc muốn vô hiệu hóa giảng viên này?"
              />
            </MyModal.Window>
          </MyModal>
        </StyledAction>
      </Table.Row>
    </>
  );
}

export default LecturerRow;