import styled from "styled-components";
import greenBean from "../../../assets/images/dauxanh.png";
import { formatCurrency } from "../../../utils/helpers";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 550;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

function StatBalanceBean({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>
        {formatCurrency(value)}{" "}
        <StyledImageBean src={greenBean} alt="dau xanh" />
      </Value>
    </StyledStat>
  );
}

export default StatBalanceBean;
