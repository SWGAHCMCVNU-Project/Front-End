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
  text-align: center;
  overflow: visible;
  white-space: normal;
  line-height: 1.5;
  padding: 1rem;
`;

const Number = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
  padding: 1rem;
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
`;

function CampaignTypeRow({ id, typeName, image, description, state, duration, coin, displayedIndex }) {
  const [isValidImage, setIsValidImage] = useState(true);
  const { campaignType, isLoading } = useCampaignTypeById(id);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  if (isLoading) {
    return <Table.Row><td colSpan="7">Đang tải...</td></Table.Row>;
  }

  const fullDescription = description || "";

  return (
    <StyledTableRow>
      <StationIndex>{displayedIndex}</StationIndex>
      <Station>
        <Img src={isValidImage ? image || logoDefault : logoDefault} />
        <StationName>{typeName}</StationName>
      </Station>
      <Description>{fullDescription}</Description>
      <Number>{duration}</Number>
      <Number>{coin}</Number>
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
              campaignTypeToEdit={campaignType?.data || { id, typeName, image, description, state, duration, coin }}
              onCloseModal={() => Modal.Close(`edit-${id}`)}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </StyledTableRow>
  );
}

export default CampaignTypeRow;