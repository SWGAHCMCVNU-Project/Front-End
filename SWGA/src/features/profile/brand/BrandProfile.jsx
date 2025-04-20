// BrandProfile.jsx
import styled from "styled-components";
import Button from "../../../ui/Button";
import ButtonGroup from "../../../ui/ButtonGroup";
import Heading from "../../../ui/Heading";
import Row from "../../../ui/Row";
import BrandDataBox from "./BrandDataBox";
import { HiPencil } from "react-icons/hi2";
import Modal from "../../../ui/Modal";
import Spinner from "../../../ui/Spinner";
import EditBrandForm from "./EditBrandForm";
import { useBrand } from "../../../hooks/brand/useBrandId";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
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

function BrandProfile({ brandId }) {
  const { brand, loading: isLoading, error } = useBrand(brandId);


  if (!brandId) return <div>Error: Brand ID is missing.</div>;

  if (isLoading) return <Spinner />;

  if (error) return <div>Error: {error}</div>;

  if (!brand) return <div>Brand with ID {brandId} not found.</div>;

  return (
    <Container>
      <ButtonGroup>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Thông tin thương hiệu</Heading>
          </HeadingGroup>
        </Row>

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
            <EditBrandForm brandToEdit={brand} />
          </Modal.Window>
        </Modal>
      </ButtonGroup>

      <BrandDataBox brand={brand} />
    </Container>
  );
}

export default BrandProfile;