import styled from "styled-components";
import { useState } from "react"; // Thêm import useState
import FilterOperations from "../../features/lucky-prize/FilterOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import LuckyPrizeTable from "../../features/lucky-prize/LuckyPrizeTable";
import LuckyPrizeTableOperations from "../../features/lucky-prize/LuckyPrizeTableOperations";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function LuckyPrize() {
  const [refetch, setRefetch] = useState(() => () => {});
  const [onPrizeAdded, setOnPrizeAdded] = useState(() => () => {});

  return (
    <Container>
      <Heading as="h1">Điểm quay may mắn</Heading>
      <Row type="horizontal">
        <FilterOperations />
        <LuckyPrizeTableOperations refetch={refetch} onPrizeAdded={onPrizeAdded} />
      </Row>
      <Row>
        <LuckyPrizeTable setRefetch={setRefetch} setOnPrizeAdded={setOnPrizeAdded} />
      </Row>
    </Container>
  );
}


export default LuckyPrize;