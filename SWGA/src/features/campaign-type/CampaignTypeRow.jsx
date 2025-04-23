import { HiPencil } from "react-icons/hi2";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import logoDefault from "../../assets/images/brand.png";
import Modal from "../../ui/Modal";
import { handleValidImageURL } from "../../utils/helpers";
import UpdateCampaignTypeForm from "./UpdateCampaignTypeForm";
import { useCampaignTypeById } from "../../hooks/campaign-type/useCampaignTypeById";

const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: #1c5d78;
  gap: 0.5rem;
`;

const Img = styled.img`
  display: block;
  width: 50px;
  object-fit: cover;
  border-radius: 8px;
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

const StationName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

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

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #1c5d78;
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center; /* Giữ căn giữa */
  overflow: visible; /* Hiển thị toàn bộ nội dung */
  white-space: normal; /* Cho phép xuống dòng */
  line-height: 1.5; /* Tăng khoảng cách dòng cho dễ đọc */
  padding: 1rem; /* Thêm padding */
  /* Bỏ max-width để nội dung tự điều chỉnh theo cột */
`;
const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* Add spacing between buttons */
`;

const StyledTableRow = styled(Table.Row)`
  & > div {
    display: flex;
    align-items: center;
    justify-content: center; /* Center content in all cells */
    padding: 1rem;
  }

  /* Left-align specific columns */
  & > div:nth-child(2) {
  }
  & > div:nth-child(3) {
    justify-content: center; /* Center-align "Mô tả" */
  }
`;

function CampaignTypeRow({ id, typeName, image, description, state, displayedIndex }) {
  const [isValidImage, setIsValidImage] = useState(true);
  const { campaignType, isLoading } = useCampaignTypeById(id);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  if (isLoading) {
    return <Table.Row><td colSpan="5">Đang tải...</td></Table.Row>;
  }

  // Use the full description instead of truncated version
  const fullDescription = description || ""; // Giữ nguyên logic lấy mô tả

  return (
    <StyledTableRow>
      <StationIndex>{displayedIndex}</StationIndex>

      <Station>
        <Img src={isValidImage ? image || logoDefault : logoDefault} />
        <StationName>{typeName}</StationName>
      </Station>

      <Description>{fullDescription}</Description>

      <div>
        <Tag type={state ? "cyan" : "error"}>{state ? "Hoạt động" : "Không hoạt động"}</Tag>
      </div>

      <StyledAction>
        <Modal>
          <Modal.Open opens={`edit-${id}`}>
            <StyledButton>
              <HiPencil />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name={`edit-${id}`}>
            <UpdateCampaignTypeForm
              campaignTypeToEdit={campaignType?.data || { id, typeName, image, description, state }}
              onCloseModal={() => Modal.Close(`edit-${id}`)}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </StyledTableRow>
  );
}

export default CampaignTypeRow;