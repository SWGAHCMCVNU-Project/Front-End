import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2"; // Bỏ HiTrash
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/plot.png";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { handleValidImageURL } from "../../utils/helpers";
import CreateAreaForm from "./CreateAreaForm";

const Category = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: #1c5d78;
  line-height: 1.6rem;
  gap: 0.5rem;
`;

const CategoryName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const CategoryIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #1c5d78;
  gap: 0.3rem;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const Img = styled.img`
  display: block;
  align-items: center;
  width: ${(props) => (props.src ? "50px" : "38px")};
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  margin-left: ${(props) => (props.src ? "2rem" : "0.5rem")};

  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const Description = styled.div`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const StyledButton = styled.button`
  text-align: left;
  background: none;
  border: none;
  padding: 0.4rem 0.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
    border: 1px solid #1c5d78;
    border-radius: 5px;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & svg:hover {
    color: #1c5d78;
  }
`;

const StyledNavigateButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

export default function AreaRow({ area, displayedIndex }) {
  const { id: areaId, areaName, image, description, dateCreated, state } = area;

  const NavigateButton = ({ children }) => {
    const navigate = useNavigate();
    return (
      <StyledNavigateButton onClick={() => navigate(`/areas/${areaId}`)}>
        {children}
      </StyledNavigateButton>
    );
  };

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  return (
    <Table.Row>
      <NavigateButton>
        <CategoryIndex>{displayedIndex}</CategoryIndex>
      </NavigateButton>
      <NavigateButton>
        <Category>
          <Img src={isValidImage ? image || "" : logoDefault} />
          <CategoryName>{areaName}</CategoryName>
        </Category>
      </NavigateButton>
      <NavigateButton>
        <Description>
          {description ? description : "Chưa cập nhật mô tả "}
        </Description>
      </NavigateButton>
      <NavigateButton>
        <Stacked>
          {format(addHours(new Date(dateCreated), 7), "dd MMM yyyy", {
            locale: vi,
          })}
        </Stacked>
      </NavigateButton>
      <NavigateButton>
        <Tag type={statusToTagName[state]}>
          {state ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      </NavigateButton>
      <StyledAction>
        <Modal>
          <Modal.Open opens="edit">
            <StyledButton>
              <HiPencil />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateAreaForm areaToEdit={area} />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}