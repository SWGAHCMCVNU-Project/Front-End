import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import styled from "styled-components";
import greenBean from "../../assets/images/dauxanh.png";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";

const StationName = styled.div`
  margin-left: ${(props) => (props.isNullImage ? "0.5rem" : "0")};
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
  gap: 0.3rem;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

function HistoryRow({ history, displayedIndex }) {
  const {
    id: historyId,
    name,
    email,
    state,
    totalIncome,
    totalSpending,
    greenWalletImage,
    coverPhoto,
    currentStateName,
    currentState,
    startOn,
    endOn,
    typeName,
    description,
    amount,
    rate,
    transactionDate,
  } = history;

  return (
    <Table.Row>
      <StationIndex>{displayedIndex}</StationIndex>
      <StationName>{name}</StationName>
      <Stacked>{typeName}</Stacked>
      <Stacked>
        <StyleGreenWallet>
          {formatCurrency(amount)}{" "}
          <StyledImageBean src={greenBean} alt="dau xanh" />
        </StyleGreenWallet>
      </Stacked>

      <Stacked>{rate}</Stacked>

      <Stacked>
        {format(addHours(new Date(transactionDate), 7), "dd/MM/yyyy, p", {
          locale: vi,
        })}
      </Stacked>
    </Table.Row>
  );
}

export default HistoryRow;
