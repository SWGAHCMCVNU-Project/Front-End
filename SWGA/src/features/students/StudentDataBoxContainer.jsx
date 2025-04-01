import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StudentDataBoxDetail from "./StudentDataBoxDetail";
import useGetStudentById from "../../hooks/student/useGetStudentById";
import { useParams } from "react-router-dom";

const StyledStudentDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

function StudentDataBoxContainer() {
  const { studentId } = useParams();
  const { student, isLoading } = useGetStudentById(studentId);

  if (isLoading) return <Spinner />;

  return (
    <StyledStudentDataBox>
      <Section>
        <Guest>
          <StudentDataBoxDetail student={student} />
        </Guest>
      </Section>
    </StyledStudentDataBox>
  );
}

export default StudentDataBoxContainer;