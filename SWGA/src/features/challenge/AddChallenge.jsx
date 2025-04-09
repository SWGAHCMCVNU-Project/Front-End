import { HiMiniPlus } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import MyModal from "../../ui/custom/Modal/MyModal";
import ChallengeForm from "./ChallengeForm";

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.4rem; /* Tăng khoảng cách giữa icon và text cho đẹp hơn */
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

export default function AddChallenge() {
  return (
    <div>
      <MyModal>
        <MyModal.Open opens="challenge-form">
          <Button>
            <StyledContainerButton>
              <StyledButton>
                <HiMiniPlus />
              </StyledButton>
              <span>Thêm thử thách mới</span>
            </StyledContainerButton>
          </Button>
        </MyModal.Open>
        <MyModal.Window name="challenge-form">
          <ChallengeForm />
        </MyModal.Window>
      </MyModal>
    </div>
  );
}