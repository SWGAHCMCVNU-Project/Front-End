import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useEffect, useState } from "react";
import logoDefault from "../../assets/images/brand.png";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import {
  formatCurrency,
  formattedHours,
  handleValidImageURL,
} from "../../utils/helpers";
import CreateBrandForm from "./CreateBrandForm";
import { useDeleteBrand } from "./useDeleteBrand";

const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
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

const StationName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
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
    border: 1px solid var(--color-green-600);
    border-radius: 5px;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & svg:hover {
    color: var(--color-green-600);
  }
`;

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
  gap: 0.3rem;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const StyledNavigateButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

function BrandRow({ brand, displayedIndex }) {
  const { isDeleting, deleteBrand } = useDeleteBrand();
  const {
    id: brandId,
    openingHours,
    closingHours,
    brandName,
    state,
    totalIncome,
    totalSpending,
    logo,
  } = brand;

  const NavigateButton = ({ children }) => {
    const navigate = useNavigate();
    return (
      <StyledNavigateButton onClick={() => navigate(`/brands/${brandId}`)}>
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
    handleValidImageURL(logo)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [logo]);

  return (
    <Table.Row>
      <NavigateButton>
        <StationIndex>{displayedIndex}</StationIndex>
      </NavigateButton>

      <NavigateButton>
        <Station>
          <Img src={isValidImage ? logo || "" : logoDefault} />
          <StationName>{brandName}</StationName>
        </Station>
      </NavigateButton>

      <NavigateButton>
        <StackedTime>
          <span>
            Mở cửa:{" "}
            <StackedTimeFrameAbove>
              {openingHours ? formattedHours(openingHours) : "Chưa cập nhật"}
            </StackedTimeFrameAbove>
          </span>
          <span>
            Đóng cửa:{" "}
            <StackedTimeFrameBelow>
              {closingHours ? formattedHours(closingHours) : "Chưa cập nhật"}
            </StackedTimeFrameBelow>
          </span>
        </StackedTime>
      </NavigateButton>

      <NavigateButton>
        <StackedTime>
          <span>
            Tổng nhận:{" "}
            <StackedTimeFrameAbove>
              {formatCurrency(totalIncome)}
            </StackedTimeFrameAbove>
          </span>
          <span>
            Tổng chi:{" "}
            <StackedTimeFrameBelow>
              {formatCurrency(totalSpending)}
            </StackedTimeFrameBelow>
          </span>
        </StackedTime>
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
            <CreateBrandForm brandToEdit={brand} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <StyledButton>
              <HiTrash />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="thương hiệu"
              disabled={isDeleting}
              onConfirm={() => deleteBrand(brandId)}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

export default BrandRow;
