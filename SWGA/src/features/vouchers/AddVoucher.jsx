import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";

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

export default function AddVoucher() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(`/vouchers/create`)}>
        <StyledContainerButton>
          <StyledButton>
            <HiMiniPlus />
          </StyledButton>
          Thêm ưu đãi
        </StyledContainerButton>
      </Button>
    </div>
  );
}
