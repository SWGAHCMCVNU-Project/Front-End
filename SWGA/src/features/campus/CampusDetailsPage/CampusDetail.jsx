import { HiPencil } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom"; // Thêm useParams
import styled from "styled-components";
import ButtonText from "../../../ui/ButtonText";
import Heading from "../../../ui/Heading";
import Row from "../../../ui/Row";
import Spinner from "../../../ui/Spinner";
import { NavigateCreateButton } from "../../../ui/custom/Button/Button";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import MyModal from "../../../ui/custom/Modal/MyModal";
import CampusFormUpdate from "../ModalCampusUpdate/campus-form-update";
import CampusDataBox from "./CampusDataBox";
import "./scss/CampusDetail.scss";
import useGetCampusById from "../../../hooks/campus/useGetCampusById";

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

function CampusDetail() {
  const { campusId } = useParams(); // Lấy campusId từ URL
  const { data: campus, isLoading } = useGetCampusById(campusId); // Truyền campusId vào hook
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!campus || !campus.success || !campus.data) {
    return <div>Không tìm thấy dữ liệu campus hoặc có lỗi xảy ra</div>;
  }

  return (
    <Container>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Thông tin cơ sở</Heading>
        </HeadingGroup>
      </Row>

      <div className="btn-header">
        <div>
          <ButtonText onClick={() => navigate("/campus")}>← Quay lại</ButtonText>
        </div>
        <div className="btn-uni-camp">
          {/* <MyModal>
            <MyModal.Open opens="edit">
              <ButtonCustom>
                <StyledContainerButton>
                  <StyledButton>
                    <HiPencil />
                  </StyledButton>
                  Cập nhật thông tin
                </StyledContainerButton>
              </ButtonCustom>
            </MyModal.Open>
            <MyModal.Window name="edit">
              <CampusFormUpdate campusToEdit={campus.data} />
            </MyModal.Window>
          </MyModal> */}

          {/* Nếu bạn có route để tạo campus mới, sửa lại URL cho phù hợp */}
          {/* <NavigateCreateButton navigateCreateURL="campus/create" label="cơ sở" /> */}
        </div>
      </div>

      <CampusDataBox campus={campus.data} />
    </Container>
  );
}

export default CampusDetail;