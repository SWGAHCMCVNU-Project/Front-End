import styled from "styled-components";
import Lecturers from "../../features/lecturers/Lecturers"; // Import component mới
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function LecturersPage() {
  return (
    <>
      <Container>
        <Heading as="h1">Giảng viên</Heading>
        <Row>
          <Lecturers />
        </Row>
      </Container>
    </>
  );
}

export default LecturersPage;