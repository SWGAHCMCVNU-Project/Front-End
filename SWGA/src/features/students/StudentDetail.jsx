import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import StudentDataBoxContainer from "./StudentDataBoxContainer";
import { useParams } from "react-router-dom";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function StudentDetail() {
  const { studentId } = useParams();

  return (
    <Container>
      <StudentDataBoxContainer studentId={studentId} />
    </Container>
  );
}

export default StudentDetail;