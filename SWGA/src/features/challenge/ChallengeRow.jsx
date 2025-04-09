import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ChallengeForm from "./ChallengeForm";
import { useUpdateChallenge } from "../../hooks/challenge/useUpdateChallenge";
import PropTypes from "prop-types";
import Tag from "../../ui/Tag";

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const ChallengeIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
`;

const ChallengeName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const ChallengeValue = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledTableRow = styled(Table.Row)`
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  & > div:nth-child(2) {
    justify-content: flex-start;
  }
`;

const StatusTag = styled.div`
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: ${(props) => 
    props.$status ? "var(--color-cyan-100)" : "var(--color-red-100)"};
  color: ${(props) => 
    props.$status ? "var(--color-cyan-700)" : "var(--color-red-700)"};
`;

function ChallengeRow({ id, challengeName, amount, condition, type, description, status, displayedIndex }) {
  const { update, isUpdating } = useUpdateChallenge();

  return (
    <StyledTableRow>
      <ChallengeIndex>{displayedIndex}</ChallengeIndex>
      <ChallengeName>{challengeName}</ChallengeName>
      <ChallengeValue>{amount}</ChallengeValue>
      <ChallengeValue>{condition}</ChallengeValue>
      <ChallengeValue>{type === 1 ? "Hằng ngày" : "Thành tựu"}</ChallengeValue>
      <div>
        <Tag type={status ? "cyan" : "error"}>{status ? "Hoạt động" : "Không hoạt động"}</Tag>
      </div>
      <StyledAction>
        <Modal>
          <Modal.Open opens={`edit-${id}`}>
            <StyledButton disabled={isUpdating}>
              <HiPencil />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name={`edit-${id}`}>
            <ChallengeForm
              challengeToEdit={{ id, challengeName, amount, condition, type, description, status }}
              onCloseModal={() => {}}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </StyledTableRow>
  );
}

ChallengeRow.propTypes = {
  id: PropTypes.string.isRequired,
  challengeName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  condition: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  description: PropTypes.string,
  status: PropTypes.bool.isRequired,
  displayedIndex: PropTypes.number.isRequired,
};

export default ChallengeRow;