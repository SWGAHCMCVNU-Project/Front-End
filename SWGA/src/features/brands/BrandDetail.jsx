import { Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom"; // Add useParams
import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import BrandDataBox from "./BrandDataBox";
import { HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import HistoriesByBrandId from "./HistoriesByBrandId";
import StoresByBrandId from "./StoresByBrandId";
import VouchersBrand from "./VouchersBrand";
import useBrand from "../../hooks/brand/useBrandId.js";
// import CampaignsByBrandId from "./CampaignsByBrandId.jsx";

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

function BrandDetail() {
  const { brandId } = useParams(); // Extract brandId from the URL
  const { brand, isLoading, error, refetch } = useBrand(brandId); // Pass brandId to useBrand
  const navigate = useNavigate();

  // Handle loading state
  if (isLoading) return <Spinner />;

  // Handle error state
  if (error) {
    return (
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Thông tin thương hiệu</Heading>
          </HeadingGroup>
        </Row>
        <p>{error}</p>
        <Button onClick={refetch}>Thử lại</Button>
      </Container>
    );
  }

  // Handle case where brand is not found
  if (!brand) {
    return (
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Thông tin thương hiệu</Heading>
          </HeadingGroup>
        </Row>
        <p>Không tìm thấy thương hiệu.</p>
      </Container>
    );
  }

  const items = [
    {
      key: "histories",
      label: "Lịch sử",
      children: <HistoriesByBrandId />,
    },
    {
      key: "stores",
      label: "Cửa hàng",
      children: <StoresByBrandId />,
    },
    {
      key: "vouchers",
      label: "Ưu đãi",
      children: <VouchersBrand />,
    },
    // {
    //   key: "campaigns",
    //   label: "Chiến dịch",
    //   children: <CampaignsByBrandId />,
    // },
  ];

  return (
    <Container>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Thông tin thương hiệu</Heading>
        </HeadingGroup>
      </Row>

      <ButtonGroup>
        <ButtonText onClick={() => navigate(`/brands`)}>
          ← Quay lại
        </ButtonText>

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
        
        </Modal>
      </ButtonGroup>

      <BrandDataBox brand={brand} />

      <Tabs defaultActiveKey="histories" items={items} />
    </Container>
  );
}

export default BrandDetail;