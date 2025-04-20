import { HiMiniPlus } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import MyModal from "../../ui/custom/Modal/MyModal";
import CreateAccountLecturer from "./CreateAccountLecturer";

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.2rem;
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

export default function AddAccountLecturer({ campusId }) { // Add campusId prop
  return (
    <div>
      <MyModal>
        <MyModal.Open opens="account-lecturer-form">
          <Button>
            <StyledContainerButton>
              <StyledButton>
                <HiMiniPlus />
              </StyledButton>
              Thêm giảng viên mới
            </StyledContainerButton>
          </Button>
        </MyModal.Open>
        <MyModal.Window name="account-lecturer-form">
          <CreateAccountLecturer
            campusId={campusId} // Pass campusId to CreateAccountLecturer
            onCloseModal={() => {}}
          />
        </MyModal.Window>
      </MyModal>
    </div>
  );
}