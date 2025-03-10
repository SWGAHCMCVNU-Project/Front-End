import styled from "styled-components";

import DashboardFilter from "./DashboardFilter";
import Row from "../../../ui/Row";
import Heading from "../../../ui/Heading";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

function StudentsActivity() {
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
        <DashboardFilter />
      </Row>
    </StyledToday>
  );
}

export default StudentsActivity;
