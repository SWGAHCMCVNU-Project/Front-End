import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import styled from "styled-components";
import Table from "../../ui/Table";
import redBean from "../../assets/images/daudo.png";
import { formatCurrency } from "../../utils/helpers";

const StationName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 600;
    font-size: 1.6rem;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.4rem;
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

const StyleRedWallet = styled.div`
  color: var(--color-error-700);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-transform: capitalize;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.2rem;
  border-radius: 5px;
  margin: 0 auto;
  width: 150px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  border: 1px solid var(--color-${(props) => props.type}-600);
`;

function OrderRow({ order, displayedIndex }) {
  const {
    id: orderId,
    orderImage,
    stationName,
    studentName,
    studentCode,
    currentState,
    currentStateName,
    dateCreated,
    amount,
  } = order;

  const statusToTagName = {
    Pending: "green",
    Confirmation: "tag-purple",
    Inactive: "error",
    Order: "tag-orange",
    Abort: "red",
    Arrival: "tag-blue",
    Receipt: "cyan",
    Preparation: "tag-volcano",
  };

  return (
    <Table.Row>
      <StationIndex>{displayedIndex}</StationIndex>

      <Stacked>
        <span>{studentName}</span>
        <span>Mã số sinh viên: {studentCode}</span>
      </Stacked>

      <StationName>{stationName}</StationName>

      <StationName>
        {format(addHours(new Date(dateCreated), 7), "dd/MM/yyyy, p", {
          locale: vi,
        })}
      </StationName>

      <StationName>
        <StyleRedWallet>
          {formatCurrency(amount)}{" "}
          <StyledImageBean src={redBean} alt="dau do" />
        </StyleRedWallet>
      </StationName>

      <Tag type={statusToTagName[currentState]}>{currentStateName}</Tag>
    </Table.Row>
  );
}

export default OrderRow;
