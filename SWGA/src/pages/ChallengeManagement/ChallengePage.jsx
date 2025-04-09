import styled from "styled-components";
import FilterOperations from "../../features/challenge/FilterOperations";
import ChallengeTable from "../../features/challenge/ChallengeTable";
import ChallengeTableOperations from "../../features/challenge/ChallengeTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function ChallengePage() {
  return (
    <>
      <Container>
        <Heading as="h1">Danh sách các thử thách và thành tựu</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <ChallengeTableOperations />
        </Row>
        <Row>
          <ChallengeTable />
        </Row>
      </Container>
    </>
  );
}

export default ChallengePage;
