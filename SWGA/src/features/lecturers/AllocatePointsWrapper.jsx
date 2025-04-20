/* eslint-disable react/prop-types */
import { Toaster } from "react-hot-toast";
import AllocatePointsForm from "./AllocatePointsForm";
import styled from "styled-components";

// Add explicit styling to ensure the modal has enough width
const StyledModalWindow = styled.div`
  width: 500px; /* Match the width used in CreateAccountLecturer modal */
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
`;

function AllocatePointsWrapper({ campusId, onCloseModal }) {
  return (
    <StyledModalWindow>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AllocatePointsForm campusId={campusId} onCloseModal={onCloseModal} />
    </StyledModalWindow>
  );
}

export default AllocatePointsWrapper;