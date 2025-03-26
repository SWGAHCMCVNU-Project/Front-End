import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import CreateLuckyPrizeForm from "./CreateLuckyPrizeForm";
import PropTypes from 'prop-types';

// Thêm các styled components mới
const StyledCell = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1.2rem 0.8rem;
  ${(props) => props.$center && "justify-content: center;"}
`;

const IndexCell = styled(StyledCell)`
  justify-content: center;
  font-weight: 500;
`;

const PrizeNameCell = styled(StyledCell)`
  min-width: 200px;
`;

const ProbabilityCell = styled(StyledCell)`
  justify-content: center;
  font-weight: 500;
`;

const QuantityCell = styled(StyledCell)`
  justify-content: center;
  font-weight: 500;
`;

const StatusCell = styled(StyledCell)`
  justify-content: center;
`;

const ActionCell = styled(StyledCell)`
  justify-content: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-green-600);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

export default function LuckyPrizeRow({
  prize,
  displayedIndex,
  onSuccess,
}) {
  const { id, prizeName, probability, quantity, status } = prize;
  const handleEditSuccess = () => {
    onSuccess?.();
  };
  return (
    <Table.Row>
      <IndexCell>{displayedIndex}</IndexCell>
      <PrizeNameCell>{prizeName}</PrizeNameCell>
      <ProbabilityCell>{probability}%</ProbabilityCell>
      <QuantityCell>{quantity}</QuantityCell>
      <StatusCell>
        <Tag type={status ? "cyan" : "error"}>
          {status ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      </StatusCell>
      <ActionCell>
        <Modal>
          <Modal.Open opens="edit-prize">
            <ActionButton>
              <HiPencil />
            </ActionButton>
          </Modal.Open>
          <Modal.Window name="edit-prize">
            <CreateLuckyPrizeForm
              prizeToEdit={prize}
              onSuccess={handleEditSuccess}
            />
          </Modal.Window>
        </Modal>
      </ActionCell>
    </Table.Row>
  );
}

LuckyPrizeRow.propTypes = {
  onSuccess: PropTypes.func
};