import styled from "styled-components";
import Button from "../../../ui/Button";
import ButtonGroup from "../../../ui/ButtonGroup";
import Heading from "../../../ui/Heading";
import Row from "../../../ui/Row";
import CampusDataBox from "./CampusDataBox";
import { HiPencil } from "react-icons/hi2";
import Modal from "../../../ui/Modal";
import Spinner from "../../../ui/Spinner";
import EditCampusForm from "./EditCampusForm";
import useGetCampusByAccountId from "../../../hooks/campus/useGetCampusByAccount"; // Import hook mới
import { useNavigate } from "react-router-dom";
import StorageService from "../../../services/storageService";

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

function CampusProfile() {
  const navigate = useNavigate();

  // Lấy accountId từ StorageService
  const accountId = StorageService.getAccountId();

  // Debug: Log accountId
  console.log("CampusProfile - accountId:", accountId);

  // Nếu không có accountId, chuyển hướng về trang đăng nhập hoặc trang lỗi
  if (!accountId) {
    console.warn("No accountId found, redirecting...");
    navigate("/login"); // Điều hướng về trang đăng nhập
    return null;
  }

  const { data: campus, isLoading, error } = useGetCampusByAccountId(accountId);

  if (isLoading) return <Spinner />;

  if (error) {
    console.error("Error fetching campus:", error.message);
    return <div>Error: {error.message}</div>;
  }

  if (!campus?.success || !campus?.data) {
    console.warn("Campus not found for accountId:", accountId);
    return <div>Campus for this account not found.</div>;
  }

  const campusData = campus.data;

  return (
    <Container>
      <ButtonGroup>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Thông tin trường học</Heading>
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
            <EditCampusForm campusToEdit={campusData} />
          </Modal.Window>
        </Modal>
      </ButtonGroup>

      <CampusDataBox campus={campusData} />
    </Container>
  );
}

export default CampusProfile;