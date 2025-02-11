import styled from "styled-components";
import FilterOperations from "../../features/students/FilterOperations";
import StudentTable from "../../features/students/StudentTable"; //
import StudentTableOperations from "../../features/students/StudentTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Students() {
  return (
    <>
      <Container>
        <Heading as="h1">Sinh viên</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <StudentTableOperations />
        </Row>
        <Row>
          <StudentTable />
        </Row>
      </Container>
    </>
  );
}

export default Students;
