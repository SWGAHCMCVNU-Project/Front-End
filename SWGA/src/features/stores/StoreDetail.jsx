import { HiPencil } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import ButtonCustom from "../../ui/custom/Button/ButtonCustom";
import StoreDataBox from "./StoreDataBox";
import { useStoreById } from "../../hooks/store/useStoreById";
import { useArea } from "../../hooks/areas/useArea";

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

function StoreDetail() {
  const { storeId } = useParams(); // Chỉ lấy storeId
  const { store, isLoading: isLoadingStore, error: storeError } = useStoreById(storeId);
  const { area, isLoading: isLoadingArea, error: areaError } = useArea();
  const navigate = useNavigate();

  if (isLoadingStore || isLoadingArea) return <Spinner />;
  if (storeError || areaError) return <div>Lỗi khi tải dữ liệu: {storeError?.message || areaError?.message}</div>;
  if (!store) return <div>Không tìm thấy cửa hàng</div>;
  console.log("Store from StoreDetail:", store); // Log the store object
  const storeWithArea = {
    ...store,
    areaName: area?.areaName || store.areaName,
  };

  return (
    <Container>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Thông tin cửa hàng</Heading>
        </HeadingGroup>
      </Row>

      <ButtonGroup>
        <ButtonText onClick={() => navigate("/stores")}>
          ← Quay lại
        </ButtonText>
        <Link  to={`/stores/edit/${store.id}`}  state={{ store }}>
          <ButtonCustom>
            <StyledContainerButton>
              <StyledButton>
                <HiPencil />
              </StyledButton>
              Chỉnh sửa
            </StyledContainerButton>
          </ButtonCustom>
        </Link>
      </ButtonGroup>
      <StoreDataBox store={storeWithArea} />
    </Container>
  );
}

export default StoreDetail;