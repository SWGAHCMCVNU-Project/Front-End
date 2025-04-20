/* eslint-disable react/prop-types */
import { HiMiniPlus } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import MyModal from "../../ui/custom/Modal/MyModal";
import AllocatePointsWrapper from "./AllocatePointsWrapper"; // New wrapper component

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

function AllocatePoints({ campusId }) {
  return (
    <div>
      <MyModal>
        <MyModal.Open opens="allocate-points-form">
          <Button> {/* Remove $variations="green" to match AddAccountLecturer */}
            <StyledContainerButton>
              <StyledButton>
                <HiMiniPlus />
              </StyledButton>
              Phân bổ điểm
            </StyledContainerButton>
          </Button>
        </MyModal.Open>
        <MyModal.Window name="allocate-points-form">
          <AllocatePointsWrapper
            campusId={campusId}
            onCloseModal={() => {}}
          />
        </MyModal.Window>
      </MyModal>
    </div>
  );
}

export default AllocatePoints;