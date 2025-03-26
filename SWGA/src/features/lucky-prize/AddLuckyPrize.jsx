import { HiMiniPlus } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateLuckyPrizeForm from "./CreateLuckyPrizeForm";
import PropTypes from 'prop-types';

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.2rem;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

export default function AddLuckyPrize({ onSuccess }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="area-form">
          <Button>
            <StyledContainerButton>
              <StyledButton>
                <HiMiniPlus />
              </StyledButton>
              Thêm điểm may mắn mới
            </StyledContainerButton>
          </Button>
        </Modal.Open>
        <Modal.Window name="area-form">
        <CreateLuckyPrizeForm onSuccess={onSuccess} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
AddLuckyPrize.propTypes = {
  onSuccess: PropTypes.func
};

AddLuckyPrize.defaultProps = {
  onSuccess: () => {}
};