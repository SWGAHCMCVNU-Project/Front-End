import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StudentDataBoxContainer from "./StudentDataBoxContainer";
import { useStudent } from "./useStudent";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function StudentDetail() {
  const { student, isLoading } = useStudent();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Container>
        <StudentDataBoxContainer student={student} />
      </Container>
    </>
  );
}

export default StudentDetail;
