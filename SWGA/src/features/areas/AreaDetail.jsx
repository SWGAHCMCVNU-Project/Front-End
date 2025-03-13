import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import AreaDataBox from "./AreaDataBox";
import CreateAreaForm from "./CreateAreaForm";
import { useArea } from "../../hooks/areas/useArea"; // Thay đổi đường dẫn import
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
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

function AreaDetail() {
  const { area, isLoading } = useArea();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Chi tiết khu vực sản phẩm</Heading>
          </HeadingGroup>
        </Row>
        <ButtonGroup>
          <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>

          <Modal>
            <Modal.Open opens="edit">
              <Button $variations="primary">
                <StyledContainerButton>
                  <StyledButton>
                    <HiPencil />
                  </StyledButton>
                  Chỉnh sửa
                </StyledContainerButton>
              </Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateAreaForm areaToEdit={area} />
            </Modal.Window>
          </Modal>
        </ButtonGroup>

        <AreaDataBox area={area} />
      </Container>
    </>
  );
}

export default AreaDetail;
