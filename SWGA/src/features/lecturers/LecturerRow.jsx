/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import styled from "styled-components";
import logoDefault from "../../assets/images/reading.png";
import Table from "../../ui/Table";
import MyModal from "../../ui/custom/Modal/MyModal";
import { formatPhoneNumber, handleValidImageURL } from "../../utils/helpers";
import AllocatePointsForm from "./AllocatePointsForm";
import { Switch } from "antd";
import { useUpdateLecturer } from "../../hooks/lecturer/useUpdateLecturer";

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
  display: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
  height: 100%;
  padding: 1rem 0.5rem;
  min-height: 50px;
`;

const Img = styled.img`
  display: block;
  width: ${(props) => (props.src ? "50px" : "38px")};
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const LecturerName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-top: 2px;
`;

const StackedFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
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
  text-align: center;
  width: 100%;
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

function LecturerRow({ lecturer, index, onAllocate }) {
  const handleNameClick = (e) => {
    e.stopPropagation();
  };

  const [isValidImage, setIsValidImage] = useState(true);
  const [localState, setLocalState] = useState(lecturer.state);

  useEffect(() => {
    handleValidImageURL(lecturer.avatar)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [lecturer.avatar]);

  const { mutate: updateLecturer, isLoading: isUpdating, isError, error } = useUpdateLecturer();

  const handleToggle = (checked) => {
    setLocalState(checked);
    updateLecturer({ id: lecturer.id, state: checked }, {
      onSuccess: () => {
        // State update successful
      },
      onError: (err) => {
        setLocalState(!checked);
        console.error("Error updating lecturer state:", err);
      },
    });
  };

  return (
    <Table.Row style={{ minHeight: "60px", display: "flex", alignItems: "center" }}>
      <>
        <StyledRow>{index}</StyledRow>
        <LecturerContainer>
          {isValidImage ? (
            <Img src={lecturer.avatar || ""} />
          ) : (
            <Img src={logoDefault} />
          )}
          <StackedFrame>
            <LecturerName onClick={handleNameClick}>
              {lecturer.fullName || "Không có tên"}
            </LecturerName>
          </StackedFrame>
        </LecturerContainer>
        <Stacked>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>
              {lecturer.phone ? formatPhoneNumber(lecturer.phone) : "N/A"}
            </span>
            <span
              style={{
                fontSize: "1.4rem",
                color: "var(--color-grey-500)",
                wordBreak: "break-word",
                width: "100%",
              }}
            >
              {lecturer.email || "N/A"}
            </span>
          </div>
        </Stacked>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60px",
          }}
        >
          <Switch
            checked={localState}
            onChange={handleToggle}
            checkedChildren="Hoạt động"
            unCheckedChildren="Không hoạt động"
            disabled={isUpdating}
          />
          {isError && <span style={{ color: "red" }}>Lỗi: {error?.message || "Cập nhật thất bại"}</span>}
        </div>
        <StyledRow>{lecturer.balance || "N/A"}</StyledRow>
        <StyledAction>
          {localState && (
            <MyModal>
              <MyModal.Open opens={`allocate-${lecturer.id}`}>
                <StyledButton onClick={(e) => e.stopPropagation()}>
                  <HiPlus />
                </StyledButton>
              </MyModal.Open>

              <MyModal.Window name={`allocate-${lecturer.id}`}>
                <AllocatePointsForm
                  campusId={lecturer.campusId}
                  lecturerIds={[lecturer.id]}
                  onCloseModal={() => {}}
                />
              </MyModal.Window>
            </MyModal>
          )}
        </StyledAction>
      </>
    </Table.Row>
  );
}

export default LecturerRow;